export abstract class DisplayScreen {
  protected readonly canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public static get name() { return ''; };
  public static get id() { return ''; }
  public abstract render(): void;
  public abstract release(): void;
}
