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

  async findAll() {
    return this.userRepository.find({
      where: {
        isAdmin: false
      }
    })
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findAllWithLaporan(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      },
      relations: ['laporan']
    })
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findWithNotifikasi(id: number) {
    return this.userRepository.findOne({
      where: {
        id
      },
      relations: ['notifikasi_user'],
    });
  }

  async insert(createUserDto: CreateUserDto) {
    try {
      const user = await this.findByEmail(createUserDto.email);

      if (user) {
        throw new HttpException('Email sudah pernah terdaftar', HttpStatus.CONFLICT);
      }

      const saltOrRounds = parseInt(process.env.SALTORROUNDS);
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const newUser = new User();
      newUser.email = createUserDto.email;
      newUser.password = hashedPassword;
      newUser.firstName = createUserDto.firstName;
      newUser.lastName = createUserDto.lastName;
      newUser.isAdmin = false;
      newUser.isBlocked = false;
      this.userRepository.save(newUser);
      return { message: 'Berhasil membuat akun', data: newUser };
    } catch (err) {
      return { message: err.message };
    }
  }

  async insertAdmin(createUserDto: CreateUserDto) {
    try {
      const user = await this.findByEmail(createUserDto.email);

      if (user) {
        throw new HttpException('Email sudah pernah terdaftar', HttpStatus.CONFLICT);
      }

      const saltOrRounds = parseInt(process.env.SALTORROUNDS);
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const newUser = new User();
      newUser.email = createUserDto.email;
      newUser.password = hashedPassword;
      newUser.firstName = createUserDto.firstName;
      newUser.lastName = createUserDto.lastName;
      newUser.isAdmin = true;
      newUser.isBlocked = false;
      this.userRepository.save(newUser);
      return { message: 'Berhasil membuat akun', data: newUser };
    } catch (err) {
      return { message: err.message };
    }
  }

  async remove(id) {
    this.userRepository.delete(id)
  }

  async updateNamaDepan({ user_id, namaDepan }) {
    try {
      let user = await this.findById(user_id)
      let updatedUser = this.userRepository.save({
        ...user,
        firstName: namaDepan
      })
      return { message: 'Edit Data Successful', data: updatedUser };
    }
    catch (err) {
      return { message: err.message };
    }
  }

  async updateNamaBelakang({ user_id, namaBelakang }) {
    try {
      let user = await this.findById(user_id)
      let updatedUser = this.userRepository.save({
        ...user,
        lastName: namaBelakang
      })
      return { message: 'Edit Data Successful', data: updatedUser };
    }
    catch (err) {
      return { message: err.message };
    }
  }

  async updatePassword({ user_id, prevPassword, newPassword }) {
    const saltOrRounds = parseInt(process.env.SALTORROUNDS);
    let user = await this.findById(user_id)
    let isMatch = user ? await bcrypt.compare(prevPassword, user.password) : false
    if (!isMatch) {
      return { message: "Kata sandi lama salah" }
    }
    const hashedPassword = await bcrypt.hash(
      newPassword,
      saltOrRounds,
    );
    this.userRepository.save({
      ...user,
      password: hashedPassword
    })
    return { message: "Berhasil mengubah kata sandi" }
  }

  async resetPassword({ user_id, newPassword }) {
    const saltOrRounds = parseInt(process.env.SALTORROUNDS);
    let user = await this.findById(user_id)
    const hashedPassword = await bcrypt.hash(
      newPassword,
      saltOrRounds,
    );
    this.userRepository.save({
      ...user,
      password: hashedPassword
    })
    return { message: "Reset Password Successful" }
  }

  async addBlockedUser({ user_id }: { user_id: number }) {
    try {
      // const checkBlockedUser = await this.findBlockedById({ user_id })
      // if (checkBlockedUser) {
      //   return { message: "User sudah masuk daftar block" }
      // }
      // const data = new CreateBlockedUserDto(user_id)
      // this.blockedUserRepository.save(data)
      // return { message: "Insert Successful" }
      const user = await this.findById(user_id)
      if (user.isBlocked) {
        return { message: "User sudah diblokir" }
      }
      user.isBlocked = true
      this.userRepository.save({ ...user, isBlocked: true })
      return { message: "Insert Successful" }
    }
    catch (err) {
      return { message: err.message }
    }
  }

  async removeBlockedUser({ user_id }: { user_id: number }) {
    try {
      // const checkBlockedUser = await this.findBlockedById({ user_id })
      // if (!checkBlockedUser) {
      //   return { message: "Tidak ada user yang bersangkutan" }
      // }
      const user = await this.findById(user_id)
      if (!user.isBlocked) {
        return { message: "Tidak ada user yang bersangkutan" }
      }
      else {
        this.userRepository.save({ ...user, isBlocked: false })
        return { message: "Delete Successful" }
      }
    } catch (err) {
      return { message: err.message };
    }
  }
}
