import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps:true,
    versionKey:false,
})

export class Course extends Document{
@Prop()
rating:string;

@Prop()
tittle:string;

@Prop()
description:string;

@Prop()
price:string;

@Prop()
category:string;

@Prop()
instructor:string;

@Prop()
videoLink:string;
}
export const CourseSchema=SchemaFactory.createForClass(Course);