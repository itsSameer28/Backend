import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
  versionKey: false,
})
export class Instructor extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phoneNo: string;

  @Prop()
  category: string;
}

export const InstructorSchema = SchemaFactory.createForClass(Instructor);
