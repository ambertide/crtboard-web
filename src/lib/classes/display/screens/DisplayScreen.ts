import type { ScreenContext } from '#lib/classes/data/ScreenContext.ts';
import type { DashboardData } from '#lib/classes/api/DashboardData.ts';

type ZoneBase = {
  x: number
  y: number
  offsetX: number
  offsetY: number
  name: string
};

type Zone = {
  active: boolean
  zoneRealColour: (typeof DisplayScreen['colors'])[keyof typeof DisplayScreen['colors']]
  zoneCurrentColour: (typeof DisplayScreen['colors'])[keyof typeof DisplayScreen['colors']]
  swappedColourNTimes: number
} & ZoneBase;

export abstract class DisplayScreen {
  protected readonly canvas: HTMLCanvasElement;
  protected readonly dashboardData: DashboardData;
  private zones: Record<string, Zone> = {};
  private sctx: ScreenContext;
  protected ctx: CanvasRenderingContext2D;
  protected static readonly colors = {
    'gray-50': '#F9FAFB',
    'gray-400': '#99A1AF',
    'gray-950': '#030712',
  };

  protected static readonly fonts = {
    header: {
      xl: '64px VT323',
      lg: '48px VT323',
      md: '32px VT323',
      sm: '28px VT323',
      xs: '24px VT323',
    },
    body: {
      lg: '28px Handjet Variable',
      md: '24px Handjet Variable',
      sm: '20px Handjet Variable',
    },
  };

  constructor(canvas: HTMLCanvasElement, dashboardData: DashboardData, screenContext: ScreenContext) {
    this.sctx = screenContext;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.dashboardData = dashboardData;
  }

  public static get name() { return ''; };
  public static get id() { return ''; }
  public abstract release(): void;

  /**
   * Draw a specific Path2D svg at a place.
   * @param path Path to draw
   * @param x X coord
   * @param y Y coord
   */
  protected drawSVGAt(path: Path2D, x: number, y: number) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.fill(path);
    this.ctx.restore();
  }

  protected get width() {
    return this.sctx.width;
  }

  protected get height() {
    return this.sctx.height;
  }

  public static get fontStrings() {
    return [
      ...Object.values(DisplayScreen.fonts.body),
      ...Object.values(DisplayScreen.fonts.header),
    ];
  }

  protected registerZone = (zone: ZoneBase) => {
    this.zones[zone.name] = {
      ...zone,
      active: false,
      zoneRealColour: '',
      zoneCurrentColour: '',
      swappedColourNTimes: 0,
    };
  };

  protected activateZone = (name: string, currentColour: string) => {
    const zone = this.zones[name];
    if (zone) {
      zone.zoneCurrentColour = currentColour;
      zone.zoneRealColour = currentColour;
      zone.swappedColourNTimes = 0;
      zone.active = true;
    }
  };

  private currentColour = () => {
    const shouldBeGray400 = ((Date.now() >> 10) & 0b1) === 1;
    return shouldBeGray400 ? DisplayScreen.colors['gray-400'] : DisplayScreen.colors['gray-50'];
  };

  private convertColor = (hex: string) => {
    const colours = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)];
    return colours.map(h => Number.parseInt(h, 16));
  };

  private swapColoursInZone = ({ zoneCurrentColour, x, y, offsetX, offsetY }: Zone, to: string) => {
    const imageData = this.ctx.getImageData(x, y, offsetX, offsetY);
    const [toR, toG, toB] = this.convertColor(to);
    const [currR, currG, currB] = this.convertColor(zoneCurrentColour);
    for (let index = 0; index < imageData.data.length; index += 4) {
      const [pR, pG, pB] = imageData.data.slice(index, index + 3);
      if (pR === currR && pG === currG && pB === currB) {
        imageData.data[index] = toR;
        imageData.data[index + 1] = toG;
        imageData.data[index + 2] = toB;
      }
    }
    this.ctx.putImageData(imageData, x, y);
  };

  public render() {
    const currentColourShouldBe = this.currentColour();
    for (const zone of Object.values(this.zones)) {
      if (!zone.active) {
        // Only switch colours for active zones
        continue;
      }
      if (zone.swappedColourNTimes >= 10 && (zone.zoneCurrentColour === zone.zoneRealColour)) {
        // If current colour is already inteded colour and we already swapped
        // 10 times or more, than we should no longer be active.
        zone.active = false;
        zone.zoneCurrentColour = '';
        zone.zoneRealColour = '';
        zone.swappedColourNTimes = 0;
        continue;
      }
      // Otherwise swap colours if colour is not the intended colour.
      if (zone.zoneCurrentColour !== currentColourShouldBe) {
        this.swapColoursInZone(zone, currentColourShouldBe);
        zone.swappedColourNTimes++;
        zone.zoneCurrentColour = currentColourShouldBe;
      }
    }
  };
}
