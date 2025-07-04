import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Control } from './schemas/control.schema';

export type FindAllFilterType = {
  borderId?: string;
  userId?: string;
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

    if (filter.borderId && filter.borderId !== '*') {
      query.borderId = filter.borderId;
    }

    if (filter.userId && filter.userId !== '*') {
      query.userId = filter.userId;
    }

    return this.controlModel
      .find(query)
      .populate('userId', 'name')
      .populate('borderId', 'name')
      .exec();
  }

  async agg(filters: {
    period: '1d' | '7d' | '30d' | '90d' | '365d';
    borderId: string;
  }): Promise<any> {
    const day = 1000 * 60 * 60 * 24;
    let daysago = 0;

    switch (filters.period) {
      case '1d':
        daysago = day;
        break;
      case '7d':
        daysago = day * 7;
        break;
      case '90d':
        daysago = day * 90;
        break;
      case '365d':
        daysago = day * 365;
        break;
      case '30d':
      default:
        daysago = day * 30;
        break;
    }

    const filterQuery: FilterQuery<any> = {
      date: {
        $gte: new Date(Date.now() - daysago),
      },
    };

    if (filters.borderId !== '*') {
      filterQuery.borderId = {
        $eq: filters.borderId,
      };
    }

    return this.controlModel.aggregate([
      {
        $match: filterQuery,
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' },
          },
          entries: { $push: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
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
