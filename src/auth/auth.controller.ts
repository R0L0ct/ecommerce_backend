import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('register')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('email') email: string,
  ): Promise<User> {
    const saltOrRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRound);
    const result = await this.userService.create({
      username,
      email,
      password: hashedPassword,
    });
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any, @Response() res: any) {
    try {
      const accessToken = await this.authService.login(req.user);
      this.authService.setAccessTokenCookie(res, accessToken);
    } catch (error) {
      return { error: 'Error' };
    }
  }

  @UseGuards(JwtGuard)
  @Get('protected')
  async getHello(@Request() req: any) {
    return req.user;
  }
}
