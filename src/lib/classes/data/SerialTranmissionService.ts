import type { ScreenContext } from './ScreenContext';
import { TransmissionService } from './TransmissionService';

// TODO: This is probably unnecessary
type SerialPort = Awaited<ReturnType<typeof navigator.serial.requestPort>>;

const packetTypeToByte = {
  DEBUG: 0x00,
  QUERY: 0x01,
  DRAW: 0x02,
};

/**
 * Send data to a webserial target
 */
export class SerialTransmissionService extends TransmissionService {
  private port: SerialPort | null = null;
  private _wasConnectedOnce = false;
  private onConnectionChange = (_: SerialTransmissionService) => {};
  private queue: { data: Uint8ClampedArray, packetType: keyof typeof packetTypeToByte }[] = [];

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

  transmit = async (data: Uint8ClampedArray, packetType: 'DEBUG' | 'QUERY' | 'DRAW'): Promise<void> => {
    this.queue.push({ data, packetType });
  };

  private transmitPacket = async (data: Uint8ClampedArray, packetType: 'DEBUG' | 'QUERY' | 'DRAW', writer: WritableStreamDefaultWriter<unknown>) => {
    const tagByte = packetTypeToByte[packetType];
    const dataSize = data.length;
    // Bytes are transmitted in little endian in three bytes
    const sizeBytes = [(dataSize & 0xFF0000) >> 16, (dataSize & 0x00FF00) >> 8, dataSize & 0x0000FF];
    const transmissionData = new Uint8ClampedArray([tagByte, ...sizeBytes, ...data]);
    await writer.write(transmissionData.buffer);
  };

  private loop = () => {
    const innerLoop = async () => {
      const writer = this.port?.writable.getWriter();
      const { data, packetType } = this.queue.shift() ?? {};
      try {
        if (data && packetType && writer) {
          console.log('writing data to port', data);
          await this.transmitPacket(data, packetType, writer);
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
      await this.transmit(new Uint8ClampedArray([0x16]), 'DEBUG');
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
