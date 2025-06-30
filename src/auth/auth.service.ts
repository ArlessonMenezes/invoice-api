import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) return null;


    const matchPassword = bcrypt.compareSync(pass, user.password);
    if (!matchPassword) return null;

    const { password, ...result } = user;

    return result;
  };

  async login(user: any) {
    const payload = { email: user.email, sub: user.idUser };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
