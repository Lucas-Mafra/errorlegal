import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';

export const tokenPayloadSchema = z.object({
  sub: z.number(),
});

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const publicKey = process.env.JWT_PUBLIC_KEY;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: publicKey,
    });
  }

  async validate(payload: TokenPayloadSchema) {
    return tokenPayloadSchema.parse(payload);
  }
}
