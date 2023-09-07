import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  versionKey: false,
  timestamps: false,
})
export class AuthUser extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'Email already exists'] })
  email: string;

  @Prop()
  phoneNo: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isAdmin: Boolean;
}

export const authUserSchema = SchemaFactory.createForClass(AuthUser);
