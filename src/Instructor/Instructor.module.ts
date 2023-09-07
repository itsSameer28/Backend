import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {InstructorServices  } from './Instructor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstructorSchema,Instructor } from './Instuctor.schema';
import { JwtModule } from '@nestjs/jwt';
import { InstructorController } from './Instructor.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '156451646',
      signOptions: { expiresIn: '2hr' },
    }),
    MongooseModule.forFeature([{ name: Instructor.name, schema: InstructorSchema }]),
  ],
  controllers: [InstructorController],
  providers: [InstructorServices],
  exports: [InstructorServices],
})
export class InstructorModule {}
