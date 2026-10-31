import type { ScreenContext } from '#lib/classes/data/ScreenContext.ts';
import type { DashboardData } from '#lib/classes/api/DashboardData.ts';

export abstract class DisplayScreen {
  protected readonly canvas: HTMLCanvasElement;
  protected readonly dashboardData: DashboardData;
  private sctx: ScreenContext;
  protected ctx: CanvasRenderingContext2D;
  protected static readonly colors = {
    'gray-50': '#F9FAFB',
    'gray-400': '#99A1AF',
    'gray-950': '#030712',
  };

  protected static readonly fonts = {
    header: {
      xl: '64 VT323',
      lg: '48 VT323',
      md: '32 VT323',
      sm: '28 VT323',
      xs: '24 VT323',
    },
    body: {
      lg: '28 Handjet Variable',
      md: '24 Handjet Variable',
      sm: '20 Handjet Variable',
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
  public abstract render(): void;
  public abstract release(): void;

  /**
   * Draw a specific Path2D svg at a place.
   * @param path Path to draw
   * @param x X coord
   * @param y Y coord
   */
  protected drawSVGAt(path: Path2D, x: number, y: number) {
    const copiedPath = new Path2D(path);
    copiedPath.moveTo(x, y);
    this.ctx.fill(path);
  }

  protected get width() {
    return this.sctx.width;
  }

  protected get height() {
    return this.sctx.height;
  }
}
