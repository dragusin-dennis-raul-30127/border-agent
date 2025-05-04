import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Border, BorderSchema } from './border.schema';
import { BorderController } from './border.controller';
import { BorderService } from './border.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Border.name, schema: BorderSchema }]),
  ],
  controllers: [BorderController],
  providers: [BorderService],
})
export class BorderModule {}
