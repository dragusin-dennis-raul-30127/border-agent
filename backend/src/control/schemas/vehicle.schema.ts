import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ _id: false })
export class Vehicle {
  @Prop({ type: String, enum: ['car', 'truck', 'motorcycle'] })
  type: 'car' | 'truck' | 'motorcycle';

  @Prop()
  licensePlate: string;

  @Prop()
  vinNumber: string;

  @Prop()
  make: string;

  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  weight: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
