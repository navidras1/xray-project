import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
class Xray {
  @Prop()
  deviceId: string;

  @Prop()
  time: Date;

  @Prop()
  dataLength: number;

  @Prop()
  dataVolume: number;
}
export const XraySchema = SchemaFactory.createForClass(Xray);
