import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createUserDto: any): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async validatePassword(username: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isValid = await user.comparePassword(password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
