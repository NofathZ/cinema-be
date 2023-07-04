import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

Injectable();
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async insert(createUserDto: CreateUserDto) {
    try {
      const user = await this.findByUsername(createUserDto.username);
      if (user) {
        return {
          success: false,
          message: "Username already used"
        };
      }
      const saltOrRounds = 13;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const userData = new User();
      userData.username = createUserDto.username;
      userData.password = hashedPassword;
      this.userRepository.save(userData);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message
      };
    }
  }

}
