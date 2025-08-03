import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    return {
      access_token: this.jwtService.sign({ sub: user._id, email: user.email }),
    };
  }

  async register(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    return {
      access_token: this.jwtService.sign({ sub: user._id, email: user.email }),
    };
  }
}
