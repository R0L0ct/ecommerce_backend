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
    return this.jwtService.sign(payload);
  }

  async setAccessTokenCookie(res: any, token: any, req: any) {
    res.cookie('accessToken', token, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });
    return res.send({
      message: 'Successful authentication',
      username: req.user.username,
    });
  }

  async generateRefreshToken(res: any, req: any) {
    const token = await req.cookies['accessToken'];
    const jwtVerify = await this.jwtService.verify(token);
    const payload = { username: jwtVerify.username, sub: jwtVerify.sub };
    const signToken = this.jwtService.sign(payload);
    res.cookie('accessToken', signToken, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });
    return res.send({ message: 'Token refreshed', token: signToken });
  }
  async logout(res: any) {
    res.clearCookie('accessToken');
    return res.status(200).send('Cookie removed successfully');
  }

  async validateSession(req: any, res: any) {
    try {
      const token = await req.body.accessToken;
      const jwtVerify = await this.jwtService.verify(token);
      if (token && jwtVerify) {
        // console.log('Valid Cookie', jwtVerify);
        return res.send({ username: jwtVerify.username, id: jwtVerify.sub });
      } else {
        // console.log('Invalid Cookie');
        return res.send({ message: 'Invalid cookie' });
      }
    } catch (err) {
      return res.send({
        message: 'Invalid JWT',
      });
    }
  }
}
