import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Control } from './schemas/control.schema';

export type FindAllFilterType = {
  borderId?: string;
  minDate?: string;
};

@Injectable()
export class ControlService {
  constructor(
    @InjectModel(Control.name) private controlModel: Model<Control>,
  ) {}

  async create(control: Control): Promise<Control> {
    const createdControl = new this.controlModel(control);
    return createdControl.save();
  }

  async findAll(): Promise<Control[]> {
    return this.controlModel.find().exec();
  }

  async findAllBy(filter: FindAllFilterType): Promise<Control[]> {
    return this.controlModel
      .find({
        borderId: filter.borderId,
      })
      .exec();
  }
}
