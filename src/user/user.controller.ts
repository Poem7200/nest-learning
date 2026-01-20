import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post()
  async create(@Body() createUserDto: any): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: {name?: string, email?: string}): Promise<User> {
    return this.userService.update(id.toString(), updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id.toString());
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('login')
  async login(@Body() loginDto: { username: string, password: string }) {
    return this.userService.validatePassword(loginDto.username, loginDto.password);
  }
}
