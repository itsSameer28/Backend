import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CourseServices } from './Course.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDto } from './Dto/CourseCreate.dto';
import { UpdateCourseDto } from './Dto/CourseUpdate.dto';

@Controller('course')
export class CourseController {
  constructor(private courseServices: CourseServices) {}

  @Post('/create')
  async createCourse(
    @Res() response,
    @Body() createCouresDto: CreateCourseDto,
  ) {
    try {
      await this.courseServices.createCourse(createCouresDto);
      return response.status(HttpStatus.OK).json({
        message: 'Course created successfully ',
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllCourse(@Res() response) {
    try {
      const couses = await this.courseServices.fetchingAllCourse();
      return response.status(HttpStatus.OK).json({
        message: 'All Course found successfully',
        couses,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getCourse(@Res() response, @Param('id') courseId: string) {
    try {
      const singleCourse = await this.courseServices.fetchSingleCourse(courseId)
      return response.status(HttpStatus.OK).json({
        singleCourse,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deleteCourse(@Res() response, @Param('id') courseId: string) {
    try {
      const removeCourse = await this.courseServices.deleteCourse(courseId);
      return response.status(HttpStatus.OK).json({
        message: 'Course deleted successfully',
        removeCourse,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Put(':id')
  async updatedInstructor(
    @Param('id') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Res() response,
  ) {
    try {
      const existingCourse = await this.courseServices.updateCourse(
        courseId,
        updateCourseDto,
      );
      const courseData = await this.courseServices.fetchingAllCourse();
      return response.status(HttpStatus.OK).json({
        message: 'Course has been successfully updated',
        existingCourse,
        courseData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
