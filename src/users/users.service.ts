import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User';
import { CreateUserDto } from './dto/create-users.dto';
import { Auth } from '../middleware/auth';
import { UpdateUserDto } from './dto/update-users.dot';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private auth: Auth,
  ) {}

  async register({
    name,
    password,
    email,
    phone,
    address,
  }: CreateUserDto): Promise<{ name: string; _id: string }> {
    const encodedPass = this.auth.encodePassword(password);

    const newUser = await this.userModel.create({
      name,
      password: encodedPass,
      email,
      phone,
      address,
    });

    return { name: newUser.name, _id: String(newUser._id) };
  }

  async login(email, password) {
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) throw new HttpException('Not Authorized', 401);

    const validPass = this.auth.validatePassword(password, user.password);

    if (validPass) {
      const encoded = this.auth.encrypt(user.email, user._id);
      const token = this.auth.createToken(encoded);
      return token;
    }

    throw new HttpException('Not Authorized', 401);
  }

  async update(
    id: string,
    { password, oldPassword, name, phone, address }: UpdateUserDto,
  ) {
    const user = await this.userModel.findOne({ active: true, _id: id });

    if (!user) throw new HttpException('Wrong id', 404);

    if (password && oldPassword) {
      const validPass = this.auth.validatePassword(password, user.password);

      if (validPass) {
        const encodedPass = this.auth.encodePassword(password);

        user.password = encodedPass;

        await user.save();

        return 'password updated';
      }
      throw new HttpException('Wrong password', 400);
    }
    if (name.length) user.name = name;
    if (phone.length) user.phone = phone;
    if (address.length) user.address = address;

    await user.save();

    return { name, phone, address, _id: id };
  }
  remove(id: string) {
    return `not implemented`;
  }
}
