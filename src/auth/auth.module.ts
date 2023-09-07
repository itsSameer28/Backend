import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MailService } from './mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, authUserSchema } from './authUser.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.startegy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '156451646',
      signOptions: { expiresIn: '2hr' },
    }),
    MongooseModule.forFeature([
      { name: AuthUser.name, schema: authUserSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, JwtStrategy],
  exports: [AuthService, MailService, JwtStrategy, PassportModule],
})
export class AuthModule {}
