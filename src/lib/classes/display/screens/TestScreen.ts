import { DisplayScreen } from './DisplayScreen';
import PM5540 from '#lib/assets/PM5540.png';

export class TestScreen extends DisplayScreen {
  private image: HTMLImageElement = new Image();

  public static get name(): string {
    return 'Test Card';
  }

  public static get id(): string {
    return 'test';
  }

  private renderOnLoad = () => {
    this.canvas.getContext('2d')?.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  };

  public render(): void {
    this.image.addEventListener('load', this.renderOnLoad);
    this.image.src = PM5540;
  }

  public release(): void {
    this.image.removeEventListener('load', this.renderOnLoad);
  }
}
