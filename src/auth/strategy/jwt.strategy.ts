import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRETKEY // Protect this
    })
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      nama: payload.nama,
      email: payload.email,
      username: payload.username,
    }
  }
}