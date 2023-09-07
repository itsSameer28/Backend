import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema, Course } from './Course.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CourseServices } from './Course.service';
import { CourseController } from './Course.controller';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '156451646',
      signOptions: { expiresIn: '2hr' },
    }),
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CourseController],
  providers: [CourseServices],
  exports: [CourseServices],
})
export class CourseModule {}
