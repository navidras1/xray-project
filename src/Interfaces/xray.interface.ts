import { Document } from 'mongoose';
export interface IDevice extends Document {
  readonly deviceId: string;

  readonly time: number;

  readonly dataLength: number;

  readonly dataVolume: number;
}
