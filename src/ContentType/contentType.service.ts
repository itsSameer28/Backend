import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { contentType } from './contentType.schema';
import { TypeCreateDto } from './Dto/contentTypecreate.dto';
import { UpdateTypeDto } from './Dto/updatedContentType.dto';
@Injectable()
export class ContentTypeServices {
  constructor(
    @InjectModel(contentType.name)
    private contentTypeModel: Model<contentType>,
  ) {}

  //Service for Creating ContentType
  async createType(TypeCreateDto: TypeCreateDto){
    const { category, description } = TypeCreateDto;
    const content= await this.contentTypeModel.findOne({category})
    if(content){
      throw new UnauthorizedException("Category already exists")
    }
    await this.contentTypeModel.create({
      category,
      description,
    });
    const contentTypeData = await this.contentTypeModel.find().exec();
    return contentTypeData;
  }

  

  // For Getting all contentType
  async fetchAllTypes() {
    const contentTypeData = await this.contentTypeModel.find().exec();
    contentTypeData.map((users) => ({
      type: users.category,
      description:users.description
    }));
    return contentTypeData;
  }

  //For Getting single contentType
  async fetchSingleType(userId: string) {
    const user = await this.contentTypeModel.find({ userId });
    return user;
  }

  //For deleting contentType
  async deleteTypes(userId: string) {
    const result = await this.contentTypeModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find User');
    }
  }

  async updateType(Id, UpdateTypeDto: UpdateTypeDto) {
    const { category, description} = UpdateTypeDto;
    const updateType = await this.findType(Id);

    if (category) {
      updateType.category = category;
    }
    if (description) {
      updateType.description = description;
    }
    updateType.save();
    return updateType;
  }

  private async findType(id: string): Promise<contentType> {
    let user: any;
    try {
      user = await this.contentTypeModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find User');
    }

    if (!user) {
      throw new NotFoundException('Could not find User');
    }
    return user;
  }
}
