import { ConsoleLogger, Injectable } from '@nestjs/common';
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
    console.log('result user: ', result)
    return result;
  };

  async login(user: any) {
    const { idUser, email } = user.user;
    const payload = { sub: idUser, email };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
