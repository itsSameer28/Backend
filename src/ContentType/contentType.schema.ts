import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
  versionKey: false,
})
export class contentType extends Document {
  @Prop()
  category: string;

  @Prop()
  description: string;
}

export const TypeSchema = SchemaFactory.createForClass(contentType);
