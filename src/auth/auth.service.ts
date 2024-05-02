import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException(`could not find the user ${username}`);
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      // refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async setAccessTokenCookie(res: any, token: any) {
    res.cookie('accessToken', token, {
      // expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
      // secure: true,
    });
    return res.send({ message: 'Successful authentication' });
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }
}
