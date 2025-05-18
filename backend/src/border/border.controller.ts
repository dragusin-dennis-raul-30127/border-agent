import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get(':borderId')
  async findBorderById(@Param('borderId') borderId: string) {
    return this.borderService.findOne(borderId);
  }

  @Patch('update/:borderId')
  async updateBorder(
    @Param('borderId') borderId: string,
    @Body() updateData: Partial<Border>,
  ) {
    return this.borderService.update(borderId, updateData);
  }

  @Delete('delete/:borderId')
  async removeBorder(@Param('borderId') borderId: string) {
    return this.borderService.delete(borderId);
  }
}
