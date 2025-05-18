import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';
import { Driver } from './driver.schema';
import { Vehicle } from './vehicle.schema';

export type ControlDocument = HydratedDocument<Control>;

@Schema()
export class Control {
  @Prop({ required: true, type: Driver })
  driver: Driver;

  @Prop({ required: true, type: Vehicle })
  vehicle: Vehicle;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Border' })
  borderId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ default: false })
  hasProblems: boolean;

  @Prop()
  problemDescription: string;
}

export const ControlSchema = SchemaFactory.createForClass(Control);
