import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';
import { Driver } from './driver.schema';
import { Vehicle } from './vehicle.schema';
import { Border } from 'src/border/border.schema';
import { User } from 'src/user/user.schema';

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
  borderId: Types.ObjectId | Border;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId | User;

  @Prop({ default: false })
  hasProblems: boolean;

  @Prop()
  problemDescription: string;
}

export const ControlSchema = SchemaFactory.createForClass(Control);
