import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller()
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return this.authService.login(req);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    const hasil = this.usersService.insert(createUserDto);
    return hasil;
  }
}
