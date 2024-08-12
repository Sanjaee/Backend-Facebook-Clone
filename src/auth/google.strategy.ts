import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails } = profile;
    const user = await this.userService.findByEmail(emails[0].value);

    if (!user) {
      // Jika user tidak ada, buat user baru
      const newUser = await this.userService.create({
        email: emails[0].value,
        googleAccountId: profile.id,
        avatarUrl: profile.photos[0].value,
      });
      const jwt = await this.authService.createJwtToken(newUser);
      return done(null, { jwt });
    }

    // Jika user sudah ada
    const jwt = await this.authService.createJwtToken(user);
    return done(null, { jwt });
  }
}
