import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Control, ControlSchema } from './schemas/control.schema';
import { ControlController } from './control.controller';
import { ControlService } from './control.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Control.name, schema: ControlSchema }]),
  ],
  controllers: [ControlController],
  providers: [ControlService],
})
export class ControlModule {}
