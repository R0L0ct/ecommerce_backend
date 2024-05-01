import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
// import { User } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
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

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    console.log(req.user);
    return this.authService.login(req.user);
  }
}
