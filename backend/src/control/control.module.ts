import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Control, ControlSchema } from './schemas/control.schema';
import { ControlController } from './control.controller';
import { ControlService } from './control.service';
import { User, UserSchema } from 'src/user/user.schema';
import { Border, BorderSchema } from 'src/border/border.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Control.name, schema: ControlSchema },
      { name: User.name, schema: UserSchema },
      { name: Border.name, schema: BorderSchema },
    ]),
  ],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
