import type { ScreenContext } from '../data/ScreenContext';
import type { DashboardData } from '../api/DashboardData';
import { DisplayService } from './DisplayService';
import { screens } from './screens';
import { DisplayScreen } from './screens/DisplayScreen';

export class CanvasDisplayService extends DisplayService {
  private readonly source: HTMLCanvasElement;
  private onSampleArrive = (_: Uint8ClampedArray) => {};
  private setIntervalID = -1;
  private canvasLoaded = false;
  private currentScreen: DisplayScreen | undefined;
  private readonly dashboardData: DashboardData;
  private readonly screenContext: ScreenContext;

  constructor(canvas: HTMLCanvasElement, dashboardData: DashboardData, screenContext: ScreenContext) {
    super();
    this.source = canvas;
    this.dashboardData = dashboardData;
    this.screenContext = screenContext;
    this.switchScreen('test');
    Promise.all(DisplayScreen.fontStrings.map(f => document.fonts.load(f))).then(
      () => {
        this.canvasLoaded = true;
        this.switchScreen('dashboard');
      },
    );
  }

  private sample = () => {
    this.currentScreen?.render();
    if (this.onSampleArrive) {
      const imageData = this.source.getContext('2d')?.getImageData(0, 0, this.source.width, this.source.height);
      // We just need two channels for black-white since all our tones are gray :pray:
      this.onSampleArrive(imageData?.data.filter((_, i) => (i % 2) === 0) ?? new Uint8ClampedArray());
    }
  };

  registerOnSampleArrive(callback: (sample: Uint8ClampedArray) => void): void {
    this.onSampleArrive = callback;
  }

  startSampling(ms: number): void {
    this.setIntervalID = window.setInterval(this.sample, ms);
  }

  stopSampling(): void {
    window.clearInterval(this.setIntervalID);
  }

  switchScreen(screen: string): void {
    const ScreenClass = screens.find(s => s.id === screen);
    if (!ScreenClass) {
      return;
    }
    if (this.currentScreen) {
      this.currentScreen.release();
    }
    this.currentScreen = new ScreenClass(this.source, this.dashboardData, this.screenContext);
    this.currentScreen.render();
  }
}
