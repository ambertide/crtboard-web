export abstract class DisplayService {
  /** Start sampling the registered sampling source. */
  abstract startSampling(ms: number): void;
  /** Stop sampling the registered sampling source. */
  abstract stopSampling(): void;
  /**
   * Register a callback to be ran when a sample is generated.
   * @param callback Callback to run with the sample.
   */
  abstract registerOnSampleArrive(callback: (sample: Blob) => void): void;

  /**
   * Switch to displayed screen to a new screen
  */
  abstract switchScreen(screen: string): void;
}
