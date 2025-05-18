import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch('update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateData: Partial<User>,
  ) {
    return this.userService.update(userId, updateData);
  }

  @Delete('delete/:userId')
  async removeUser(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
