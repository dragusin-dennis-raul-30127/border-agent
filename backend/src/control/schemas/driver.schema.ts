import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema({ _id: false })
export class Driver {
  @Prop()
  name: string;

  @Prop()
  documentNumber: string;

  @Prop({ type: String, enum: ['ci', 'passport'] })
  documentType: 'ci' | 'passport';
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
