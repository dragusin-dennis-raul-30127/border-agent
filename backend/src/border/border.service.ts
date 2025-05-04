import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Border } from './border.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class BorderService {
  constructor(@InjectModel(Border.name) private borderModel: Model<Border>) {}

  async create(border: Border): Promise<Border> {
    const createdBorder = new this.borderModel(border);
    return createdBorder.save();
  }

  async findAll(): Promise<Border[]> {
    return this.borderModel.find().exec();
  }
}
