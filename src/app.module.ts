import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeaveModule } from './ContentType/contentType.module';
import {InstructorModule} from './Instructor/Instructor.module'
import { CourseModule } from './Courses/Couse.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        transport: {
          port: 587,
          requireTLS: true,
          host: "smtp.gmail.com",
          secure: false,
          auth: {
            user:"kmitdev1@gmail.com",
            pass: "kocixfjeyvokxcds"
          },
        },
        defaults: {
          from: "kmitdev1@gmail.com",
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CourseModule,
    LeaveModule,
    InstructorModule,
    MongooseModule.forRoot(
      "mongodb://0.0.0.0/LearningCourse"
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}