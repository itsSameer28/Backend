import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ContentTypeServices } from './contentType.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeSchema, contentType } from './contentType.schema';
import { JwtModule } from '@nestjs/jwt';
import { ContentTypeController } from './contentType.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '156451646',
      signOptions: { expiresIn: '2hr' },
    }),
    MongooseModule.forFeature([{ name: contentType.name, schema: TypeSchema }]),
  ],
  controllers: [ContentTypeController],
  providers: [ContentTypeServices],
  exports: [ContentTypeServices],
})
export class LeaveModule {}
