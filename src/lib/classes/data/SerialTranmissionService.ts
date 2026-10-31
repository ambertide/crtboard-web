import type { ScreenContext } from './ScreenContext';
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
  private queue: Blob[] = [];

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
    if (data.size > 10) {
      return;
    }
    this.queue.push(data);
  };

  private loop = () => {
    const innerLoop = async () => {
      const writer = this.port?.writable.getWriter();
      const data = this.queue.shift();
      try {
        if (data) {
          console.log('writing data to port', data);
          await writer?.write(await data.arrayBuffer());
        }
      }
      catch (exception) {
        console.error(exception);
      }
      finally {
        writer?.releaseLock();
      }
      setTimeout(innerLoop, 1000 / 25);
    };
    innerLoop();
  };

  initialise = async () => {
    const userDefinedPort = await navigator.serial.requestPort();
    try {
      await userDefinedPort.open({ baudRate: 38400 });
      await this.transmit(new Blob([new Uint8Array([0x0, 0x0, 0x0, 0x01, 0x16])]));
      this.onPortConnect(userDefinedPort);
    }
    catch (e) {
      console.log(e);
    }
    userDefinedPort.addEventListener('disconnect', () => this.onPortDisconnect());
    this.loop();
  };

  registerOnConnectionChange = (onConnectionChange: (service: TransmissionService) => void) => {
    this.onConnectionChange = onConnectionChange;
  };

  get screenContext(): ScreenContext {
    return {
      signal: 'PAL',
      width: 720,
      height: 576,
    };
  }
}
