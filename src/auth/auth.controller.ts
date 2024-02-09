import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from 'src/dtos/user.dto';
import { loginUserDTO } from 'src/dtos/loginUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDTO: CreateUserDto) {
    return await this.authService.signUpUser(createUserDTO);
  }
  @Post('login')
  async login(@Body() data: loginUserDTO) {
    try {
      if(!(data.username && data.password)){
        return {
          success:false,
          message: "Please fill the Required Fields"
        }
      }
      return await this.authService.login(data);
  
    } catch (e) {
      throw new HttpException(
        { success: false, message: e?.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
