import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './schemas/cat.schema';
import { CreateCatDTO } from './dtos/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDTO: CreateCatDTO) {
    return this.catsService.create(createCatDTO);
  }

  @Get()
  async findAllCats(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
