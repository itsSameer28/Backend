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
import { InstructorServices } from './Instructor.service';
import { InstructorDto } from './Dto/InstructorCreate.dto';
import { InstructorUpdateDto } from './Dto/InstructorUpdate.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('instructor')
export class InstructorController {
  constructor(private instructorServices: InstructorServices) {}

  @Post('/create')
  async createInstructor(
    @Res() response,
    @Body() InstructorCreateDto: InstructorDto,
  ) {
    try {
      await this.instructorServices.createInstructor(InstructorCreateDto);
      return response.status(HttpStatus.OK).json({
        message: 'Instructor Created successfully',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllContentType(@Res() response) {
    try {
      const contentTypeData =
        await this.instructorServices.fetchAllInstructor();
      return response.status(HttpStatus.OK).json({
        message: 'All content found successfully',
        contentTypeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUser(@Res() response, @Param('id') InstructorId: string) {
    try {
      const SingleUserTypeData =
        await this.instructorServices.fetchSingleInstructor(InstructorId);
      return response.status(HttpStatus.OK).json({
        SingleUserTypeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async removeContentType(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.instructorServices.deleteTypes(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Instructor deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  async updatedInstructor(
    @Param('id') instructorId: string,
    @Body() instructorUpdateDto: InstructorUpdateDto,
    @Res() response,
  ) {
    try {
      const existingInstructor = await this.instructorServices.updateInstructor(
        instructorId,
        instructorUpdateDto,
      );
      const instructorData = await this.instructorServices.fetchAllInstructor();
      return response.status(HttpStatus.OK).json({
        message: 'Instructor has been successfully updated',
        existingInstructor,
        instructorData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
