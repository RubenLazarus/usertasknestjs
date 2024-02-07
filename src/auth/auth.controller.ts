import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { CreateUserDetails } from 'src/utils/types';
import { IAuthService } from './auth';
import { IUserService } from 'src/users/users';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDTO: CreateUserDetails) {
    return await this.authService.signUpUser(createUserDTO);
  }
}
