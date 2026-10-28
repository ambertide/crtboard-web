import { SerialTransmissionService } from './data/SerialTranmissionService';
import type { TransmissionService } from './data/TransmissionService';
import { CanvasDisplayService } from './display/CanvasDisplayService';
import type { DisplayService } from './display/DisplayService';

export class ServiceLocator {
  transmissionState = $state({
    isConnected: false,
    wasConnected: false,
  });

  private readonly transmissionService: TransmissionService;
  private readonly displayService: DisplayService;

  constructor(canvas: HTMLCanvasElement) {
    this.displayService = new CanvasDisplayService(canvas);
    this.transmissionService = new SerialTransmissionService();
    // Register callback to pass the screen samples to RPI4.
    this.displayService.registerOnSampleArrive(this.transmissionService.transmit);
    // Register a connection change handler so that we can keep it reactive.
    this.transmissionService.registerOnConnectionChange((service) => {
      this.transmissionState.isConnected = service.connected;
      this.transmissionState.wasConnected = service.wasConnectedOnce;
    });
  }

  public async startStreaming(): Promise<void> {
    await this.service('transmission').initialise();
    this.displayService.startSampling(1000 / 25); // ~50Hz
  }

  public service(name: 'transmission'): TransmissionService;
  public service(name: 'service'): DisplayService;
  public service(name: string): DisplayService | TransmissionService | undefined {
    switch (name) {
      case 'transmission':
        return this.transmissionService;
      case 'display':
        return this.displayService;
    }
    return undefined;
  };
}
