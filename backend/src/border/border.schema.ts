import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BorderDocument = HydratedDocument<Border>;

@Schema()
export class Border {
  @Prop()
  name: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ default: true })
  areTrucksAllowed: boolean;
}

export const BorderSchema = SchemaFactory.createForClass(Border);
