import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { deleteFile } from '../utils/files';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, path: string): Promise<User> {
    const { name, last_name: lastName, address } = createUserDto;
    const user = new this.userModel({
      name,
      last_name: lastName,
      address,
      picture: path,
    });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    path: string,
  ): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { name, last_name: lastName, address } = updateUserDto;
    const payload = {
      name,
      last_name: lastName,
      address,
    };
    if (path && user?.picture) {
      await deleteFile(user.picture);
      payload['picture'] = path;
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, payload);
    if (!updatedUser) {
      throw new InternalServerErrorException('Error updating user');
    }
    return await this.userModel.findOne({ _id: id }).exec();
  }
}
