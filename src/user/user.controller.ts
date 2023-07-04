import {
  Controller,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

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
