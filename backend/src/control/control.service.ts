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
    return this.controlModel
      .find()
      .populate('userId', 'name')
      .populate('borderId', 'name')
      .exec();
  }

  async findAllBy(filter: FindAllFilterType): Promise<Control[]> {
    const query: any = {};

    if (filter.borderId) {
      query.borderId = filter.borderId;
    }

    return this.controlModel.find(query).exec();
  }

  async update(
    id: string,
    updateData: Partial<Control>,
  ): Promise<Control | null> {
    return this.controlModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async delete(id: string): Promise<Control | null> {
    return this.controlModel.findByIdAndDelete(id).exec();
  }
}
