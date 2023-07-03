import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  username: string;
  password: string;
}
