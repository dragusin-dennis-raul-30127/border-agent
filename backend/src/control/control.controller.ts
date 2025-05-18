import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Control } from './schemas/control.schema';
import { ControlService, FindAllFilterType } from './control.service';
import { ControlStatistics } from './statistics.types';

@Controller('control')
export class ControlController {
  constructor(private readonly controlService: ControlService) {}

  @Post()
  async createControl(@Body() control: Control) {
    return this.controlService.create(control);
  }

  @Get()
  async findAllControls(): Promise<Control[]> {
    return this.controlService.findAll();
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

  @Get('statistics')
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
        numberOfCarsPassed += 1;
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
}
