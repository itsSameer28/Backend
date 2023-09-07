import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthUser } from './authUser.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(AuthUser.name)
    private authUserModel: Model<AuthUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '156451646',
    });
  }
  async validate(payload) {
    const { id } = payload;

    const user = await this.authUserModel.findById(id);
    if (!user) {
      throw new UnauthorizedException('Login First to access this endpoint');
    }
    return user;
  }
}
