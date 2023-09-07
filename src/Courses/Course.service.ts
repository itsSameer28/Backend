import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './Course.schema';
import { CreateCourseDto } from './Dto/CourseCreate.dto';
import { UpdateCourseDto } from './Dto/CourseUpdate.dto';

@Injectable()
export class CourseServices {
  constructor(
    @InjectModel(Course.name)
    private CourseModel: Model<Course>,
  ) {}

  //For creating Course
  async createCourse(createCourseDto: CreateCourseDto) {
    const { rating, tittle, price, description,instructor,category,videoLink } = createCourseDto;
    const course = await this.CourseModel.findOne({ tittle });
    if (course) {
      throw new UnauthorizedException(
        'Tittle already exists, try another tittle',
      );
    }
    await this.CourseModel.create({
      tittle,
      description,
      rating,
      price,
      instructor,
      category,
      videoLink,
    });
    const courses = await this.CourseModel.find().exec();
    return { courses };
  }

  //For getting all courses
  async fetchingAllCourse() {
    const allCourse = await this.CourseModel.find().exec();
    return allCourse;
  }

  //For getting single Course
  async fetchSingleCourse(courseId: string) {
    const course = this.findCourse(courseId);
    return course;
  }
  //For deleting course
  async deleteCourse(CourseId: string) {
    const course = await this.CourseModel.deleteOne({
      _id: CourseId,
    }).exec();
    if (course.deletedCount === 0) {
      throw new NotFoundException('Could not find Course');
    }
  }

  //For updating Course
  async updateCourse(couresId: string, updateCouresDto: UpdateCourseDto) {
    const { rating, tittle, description, price ,category,instructor,videoLink} = updateCouresDto;
    const updateCourse = await this.findCourse(couresId);
    if (rating) {
      updateCourse.rating = rating;
    }
    if (tittle) {
      updateCourse.tittle = tittle;
    }
    if (description) {
      updateCourse.description = description;
    }
    if (price) {
      updateCourse.price = price;
    }
    if (category) {
      updateCourse.category = category;
    }
    if (instructor) {
      updateCourse.instructor = instructor;
    }
    if (videoLink) {
      updateCourse.videoLink = videoLink;
    }
    updateCourse.save();
  
    return updateCourse;
  }

  //Find Course
  private async findCourse(id: string): Promise<Course> {
    let courseData: any;
    try {
      courseData = await this.CourseModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find User');
    }

    if (!courseData) {
      throw new NotFoundException('Could not find User');
    }
    return courseData;
  }

}
