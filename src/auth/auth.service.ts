import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string): Promise<any> {
    return this.userService.findByEmail(email);
  }

  async createJwtToken(user: any) {
    const payload = { email: user.email, userId: user.id, avatarUrl: user.avatarUrl };
    return this.jwtService.sign(payload);
  }
}
