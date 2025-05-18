import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BorderDocument = HydratedDocument<Border>;

@Schema()
export class Border {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true, default: true })
  areTrucksAllowed: boolean;
}

export const BorderSchema = SchemaFactory.createForClass(Border);
