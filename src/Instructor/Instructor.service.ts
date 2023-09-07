import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from './Instuctor.schema';
import { InstructorDto } from './Dto/InstructorCreate.dto';
import { InstructorUpdateDto } from './Dto/InstructorUpdate.dto';
@Injectable()
export class InstructorServices {
  constructor(
    @InjectModel(Instructor.name)
    private InstructorModel: Model<Instructor>,
  ) {}

  //Service for Creating Instructor
  async createInstructor(InstructorCreateDto: InstructorDto) {
    const { name, email, phoneNo, category } = InstructorCreateDto;
    const users = await this.InstructorModel.findOne({ email });
    if (users) {
      throw new UnauthorizedException('User already Exists');
    }
    await this.InstructorModel.create({
      name,
      email,
      phoneNo,
      category,
    });
    const instructor = await this.InstructorModel.find().exec();

    return { instructor };
  }

  // For Getting all Instructor
  async fetchAllInstructor() {
    const contentTypeData = await this.InstructorModel.find().exec();
    return contentTypeData;
  }

  //For Getting single contentType
  async fetchSingleInstructor(InstructorId: string) {
    const user = this.findInstructor(InstructorId);
    return user;
  }

  //For deleting Instructor
  async deleteTypes(InstructorId: string) {
    const result = await this.InstructorModel.deleteOne({
      _id: InstructorId,
    }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find User');
    }
  }

  //For Updating Instructor
  async updateInstructor(
    InstructorId: string,
    updateIntructorDto: InstructorUpdateDto,
  ) {
    const { name, email, phoneNo, category } = updateIntructorDto;
    const updateInstructor = await this.findInstructor(InstructorId);
    if (email) {
      updateInstructor.email = email;
    }
    if (name) {
      updateInstructor.name = name;
    }
    if (phoneNo) {
      updateInstructor.phoneNo = phoneNo;
    }

    if (category) {
      updateInstructor.category = category;
    }

    updateInstructor.save();
    return updateInstructor;
  }

  private async findInstructor(id: string): Promise<Instructor> {
    let user: any;
    try {
      user = await this.InstructorModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find User');
    }

    if (!user) {
      throw new NotFoundException('Could not find User');
    }
    return user;
  }
}
