import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DEMO_USER } from '../constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      return { username };
    }
    return null;
  }

  login(user: { username: string }) {
    const payload = { username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
