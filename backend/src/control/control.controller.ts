import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Control } from './schemas/control.schema';
import { ControlService, FindAllFilterType } from './control.service';
import { ControlStatistics } from './statistics.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('control')
@UseGuards(JwtAuthGuard)
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  async createControl(@Body() control: Control) {
    return this.controlService.create(control);
  }

  @Get()
  async findAllControls(
    @Query('borderId') borderId?: string,
    @Query('userId') userId?: string,
  ): Promise<Control[]> {
    return this.controlService.findAllBy({
      borderId,
      userId,
    });
  }

  @Patch('update/:controlId')
  async updateControl(
    @Param('controlId') controlId: string,
    @Body() updateData: Partial<Control>,
  ) {
    return this.controlService.update(controlId, updateData);
  }

  @Delete('delete/:controlId')
  async removeControl(@Param('controlId') controlId: string) {
    return this.controlService.delete(controlId);
  }

  @Get('statistics/summary')
  async getStatistics(
    @Query('borderId') borderId?: string,
    @Query('period') period?: '1d' | '7d' | '30d' | '90d' | '365d',
  ): Promise<ControlStatistics> {
    const filter: FindAllFilterType = {};

    if (borderId) {
      filter.borderId = borderId;
    }

    const controls: Control[] = await this.controlService.findAllBy(filter);

    let problematicPercent = 0;
    let numberOfTrucksPassed = 0;
    let numberOfCarsPassed = 0;
    let numberOfMotorcyclesPassed = 0;

    let problematicControls = 0;

    controls.forEach((control) => {
      if (control.hasProblems) {
        problematicControls += 1;
      }

      if (control.vehicle.type === 'truck') {
        numberOfTrucksPassed += 1;
      }

      if (control.vehicle.type === 'car') {
        numberOfCarsPassed += 1;
      }

      if (control.vehicle.type === 'motorcycle') {
        numberOfMotorcyclesPassed += 1;
      }
    });

    problematicPercent = problematicControls / controls.length;

    return {
      problematicPercent: problematicPercent,
      numberOfTrucksPassed: numberOfTrucksPassed,
      numberOfCarsPassed: numberOfCarsPassed,
      numberOfMotorcyclesPassed: numberOfMotorcyclesPassed,
    };
  }

  @Get('statistics/daily')
  async getDailyStats(
    @Query('borderId') borderId: string,
    @Query('period') period?: '1d' | '7d' | '30d' | '90d' | '365d',
  ): Promise<any> {
    const filters: any = {};

    if (!period) {
      period = '30d';
    }

    filters.borderId = borderId;
    filters.period = period;

    return await this.controlService.agg(filters);
  }
}
