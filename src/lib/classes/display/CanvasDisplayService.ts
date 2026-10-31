import type { ScreenContext } from '../data/ScreenContext';
import type { DashboardData } from '../api/DashboardData';
import { DisplayService } from './DisplayService';
import { screens } from './screens';
import type { DisplayScreen } from './screens/DisplayScreen';

export class CanvasDisplayService extends DisplayService {
  private readonly source: HTMLCanvasElement;
  private onSampleArrive = (_: Blob) => {};
  private setIntervalID = -1;
  private currentScreen: DisplayScreen | undefined;
  private readonly dashboardData: DashboardData;
  private readonly screenContext: ScreenContext;

  constructor(canvas: HTMLCanvasElement, dashboardData: DashboardData, screenContext: ScreenContext) {
    super();
    this.source = canvas;
    this.dashboardData = dashboardData;
    this.screenContext = screenContext;
    this.switchScreen('dashboard');
  }

  private sample = () => {
    this.source.toBlob(blob => blob ? this.onSampleArrive(blob) : (b: null) => b);
  };

  registerOnSampleArrive(callback: (sample: Blob) => void): void {
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
