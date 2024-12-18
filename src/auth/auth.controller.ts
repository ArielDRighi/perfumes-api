import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/users.entity';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.authservice.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto): Promise<{ token: string }> {
    return this.authservice.signin(signinDto);
  }
}
