import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  badgeNumber: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Border' })
  borderId: Types.ObjectId;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
