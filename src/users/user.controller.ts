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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Post('login')
  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  login(@Request() req, @Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(req);
  }

  @Post('register')
  @ApiTags('auth')
  register(@Body() createUserDto: CreateUserDto) {
    const hasil = this.usersService.insert(createUserDto);
    return hasil;
  }

  @Post('admin/register')
  @ApiTags('auth')
  adminRegister(@Body() createUserDto: CreateUserDto) {
    const hasil = this.usersService.insertAdmin(createUserDto);
    return hasil;
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiTags('user')
  @UseGuards(JwtAuthGuard)
  getUserData(@Request() req): any {
    return this.usersService.findById(req.user.id);
  }

  @Post('user/nama-depan')
  @UseGuards(JwtAuthGuard)
  updateNamaDepan(@Request() req, @Body('nama_depan') namaDepan: string) {
    return this.usersService.updateNamaDepan({
      user_id: req.user.id,
      namaDepan,
    });
  }

  @Post('user/nama-belakang')
  @UseGuards(JwtAuthGuard)
  updateNamaBelakang(
    @Request() req,
    @Body('nama_belakang') namaBelakang: string,
  ) {
    return this.usersService.updateNamaBelakang({
      user_id: req.user.id,
      namaBelakang,
    });
  }

  // @Get('user/:username')
  // @ApiTags('user')
  // userInfo(@Param() params): any {
  //   return this.usersService.findById(params.username);
  // }

  @Post('block-user')
  addBlockedUser(@Body('user_id') user_id: number): any {
    const result = this.usersService.addBlockedUser({ user_id });
    return result;
  }

  @Post('unblock-user')
  removeBlockedUser(@Body('user_id') user_id: number): any {
    const result = this.usersService.removeBlockedUser({ user_id });
    return result;
  }

  @Post('/update-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updatePassword(
    @Req() req,
    @Body('new_password') newPassword: string,
    @Body('prev_password') prevPassword: string,
  ) {
    return this.usersService.updatePassword({
      user_id: req.user.id,
      prevPassword,
      newPassword,
    });
  }

  @Post('/reset-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  resetPassword(@Req() req, @Body('new_password') newPassword: string) {
    return this.usersService.resetPassword({
      user_id: req.user.id,
      newPassword,
    });
  }

  @Get('/all-user')
  getAllUser() {
    return this.usersService.findAll();
  }
}
