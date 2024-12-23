import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth') {
  constructor() {
    super({
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
      tokenURL: 'https://oauth2.googleapis.com/token',
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/oauth/callback',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Aquí puedes buscar o crear el usuario en tu base de datos
    return { accessToken, profile };
  }
}
