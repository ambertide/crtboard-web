export abstract class TransmissionService {
  /** Initialise the data handler. */
  abstract initialise(): Promise<void>;
  /** Transmit some data to the target of the data handler. */
  abstract transmit(data: Blob): void;
  /** Returns while this data handler *is* connected */
  abstract get connected(): boolean;
  /** Returns whether this data handler was once connected */
  abstract get wasConnectedOnce(): boolean;
  /** Register a callback to be run when a port is disconnected  or connectec */
  abstract registerOnConnectionChange(onConnectionChange: (service: TransmissionService) => void): void;
}
