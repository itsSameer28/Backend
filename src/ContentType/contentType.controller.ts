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
  UseGuards
} from '@nestjs/common';
import { ContentTypeServices } from './contentType.service';
import { TypeCreateDto } from './Dto/contentTypecreate.dto';
import { UpdateTypeDto } from './Dto/updatedContentType.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('contenttype')
export class ContentTypeController {
  constructor(private ContentTypeServices: ContentTypeServices) {}
  @Post()
  async contentTypeCreation(
    @Res() response,
    @Body() TypeCreateDto: TypeCreateDto,
  ): Promise<{ token: string }> {
    try {
      await this.ContentTypeServices.createType(TypeCreateDto);
      return response.status(HttpStatus.OK).json({
        message: 'Data Created successfully',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllContentType(@Res() response) {
    try {
      const contentTypeData = await this.ContentTypeServices.fetchAllTypes();
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
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const SingleUserTypeData = await this.ContentTypeServices.fetchSingleType(
        userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'All user data found successfully',
        SingleUserTypeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async removeContentType(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.ContentTypeServices.deleteTypes(userId);
      return response.status(HttpStatus.OK).json({
        message: 'data deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  async updatedContentType(
    @Param('id') userId: string,
    @Body() UpdateTypeDto: UpdateTypeDto,
    @Res() response,
  ) {
    try {
      const existingUser = await this.ContentTypeServices.updateType(
        userId,
        UpdateTypeDto,
      );
      const contentTypeData = await this.ContentTypeServices.fetchAllTypes();
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
        contentTypeData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
