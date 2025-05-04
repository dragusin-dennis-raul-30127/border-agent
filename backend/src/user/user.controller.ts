import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('byBorder/:borderId')
  async findUsersByBorderId(
    @Param('borderId') borderId: string,
  ): Promise<User[]> {
    return this.userService.getByBorderId(borderId);
  }
}
