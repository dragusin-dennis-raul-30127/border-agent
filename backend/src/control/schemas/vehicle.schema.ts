import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ _id: false })
export class Vehicle {
  @Prop({ required: true, type: String, enum: ['car', 'truck', 'motorcycle'] })
  type: 'car' | 'truck' | 'motorcycle';

  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true })
  vinNumber: string;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  weight: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
