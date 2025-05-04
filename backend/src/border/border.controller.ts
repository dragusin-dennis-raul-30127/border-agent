import { Body, Controller, Get, Post } from '@nestjs/common';
import { Border } from './border.schema';
import { BorderService } from './border.service';

@Controller('border')
export class BorderController {
  constructor(private readonly borderService: BorderService) {}

  @Post()
  async createBorder(@Body() border: Border) {
    return this.borderService.create(border);
  }

  @Get()
  async findAllBorders(): Promise<Border[]> {
    return this.borderService.findAll();
  }
}
