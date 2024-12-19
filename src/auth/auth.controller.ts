import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/users.entity';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({
    status: 201,
    description: 'User successfully signed up',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async signup(@Body() signupDto: SignupDto): Promise<User> {
    return this.authservice.signup(signupDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User signin' })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
    type: String,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signin(@Body() signinDto: SigninDto): Promise<{ token: string }> {
    return this.authservice.signin(signinDto);
  }
}
