import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.isBlocked) {
      // const checkBlockedUser = await this.userService.findBlockedById({ user_id: user.id.toString() })
      // if (checkBlockedUser) {
      return 1
      // }
    }
    let isMatch = false;
    isMatch = user ? await bcrypt.compare(password, user.password) : false;
    if (user && isMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return 0;
  }

  async checkIsAdmin(user_id) {
    const user = await this.userService.findById(user_id)
    if (user.isAdmin) {
      return true
    }
    return false
  }

  async login({ user, body }) {
    if (parseInt(body.asAdmin)) {
      const isAdmin = await this.checkIsAdmin(user.id)
      if (!isAdmin) {
        throw new HttpException('Your account is not an admin', HttpStatus.NOT_ACCEPTABLE);
      }
    }
    else if (!parseInt(body.asAdmin)) {
      const isAdmin = await this.checkIsAdmin(user.id)
      if (isAdmin) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    }

    const payload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    };

    return {
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async ForgetPasswordJwt({ id, email }) {
    const payload = {
      sub: id,
      email: email,
      isAdmin: 0
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
