import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDto: CreateUserDto) {
    const existedUser = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existedUser) {
      return 'Email already in use';
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;

    const user = await this.userModel.create(createUserDto);
    const response = {
      id: user._id,
      email: user.email,
    };

    return response;
  }

  async login(request: UserLoginDto) {
    const user = await this.userModel.findOne({
      email: request.email,
    });
    if (!user) {
      return 'User not found';
    }

    const comparePassword = await bcrypt.compare(
      request.password,
      user.password,
    );

    if (!comparePassword) {
      return 'Incorrect password';
    }

    const response = {
      id: user._id,
      email: user.email,
    };

    return response;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}

//Проверка email
