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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    let isMatch = false;
    isMatch = user ? await bcrypt.compare(password, user.password) : false;
    if (user && isMatch) {
      const { password, ...rest } = user;
      return rest;
    }
    return 0;
  }

  async login({ user }) {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }
}
