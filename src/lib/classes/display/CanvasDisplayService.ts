import { DisplayService } from './DisplayService';

export class CanvasDisplayService extends DisplayService {
  private readonly source: HTMLCanvasElement;
  private onSampleArrive = (_: Blob) => {};
  private setIntervalID = -1;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.source = canvas;
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
}
