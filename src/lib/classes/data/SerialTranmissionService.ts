import { TransmissionService } from './TransmissionService';

// TODO: This is probably unnecessary
type SerialPort = Awaited<ReturnType<typeof navigator.serial.requestPort>>;

/**
 * Send data to a webserial target
 */
export class SerialTransmissionService extends TransmissionService {
  private port: SerialPort | null = null;
  private _wasConnectedOnce = false;
  private onConnectionChange = (_: SerialTransmissionService) => {};

  constructor() {
    super();
  }

  get connected() {
    return !!this.port;
  }

  get wasConnectedOnce() {
    return this._wasConnectedOnce;
  }

  private onPortDisconnect = () => {
    this.port = null;
    this.onConnectionChange(this);
  };

  private onPortConnect = (s: SerialPort) => {
    this.port = s;
    this._wasConnectedOnce = true;
    this.onConnectionChange(this);
  };

  transmit = async (data: Blob): Promise<void> => {
    const writer = this.port?.writable.getWriter();
    await writer?.write(await data.arrayBuffer());
    writer?.releaseLock();
  };

  initialise = async () => {
    const userDefinedPort = await navigator.serial.requestPort();
    try {
      await userDefinedPort.open({ baudRate: 38400 });
      this.onPortConnect(userDefinedPort);
      await this.transmit(new Blob([new Uint8Array([2, 34, 5, 0x0D, 0x0A])]));
    }
    catch (e) {
      console.log(e);
    }
    userDefinedPort.addEventListener('disconnect', () => this.onPortDisconnect());
  };

  registerOnConnectionChange = (onConnectionChange: (service: TransmissionService) => void) => {
    this.onConnectionChange = onConnectionChange;
  };
}
