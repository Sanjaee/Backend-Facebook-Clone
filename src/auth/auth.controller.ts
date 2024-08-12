import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Ini akan memulai proses otentikasi
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // Setelah berhasil login, JWT akan dikirim sebagai cookie atau URL param ke Next.js
    const jwt = req.user['jwt'];
    res.redirect(`${process.env.NEXTAUTH_URL}?jwt=${jwt}`);
  }
}
