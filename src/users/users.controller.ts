import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dot';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.usersService.register(user);
  }

  @Post('login')
  login(@Body() username: string, password: string) {
    return this.usersService.login(username, password);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
