import { Prop } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;

  @Prop()
  password: string;
}
