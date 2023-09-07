import {  IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class InstructorUpdateDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email'})
  readonly email: string;
  
  @IsNotEmpty()
  @IsString()
  readonly phoneNo:string; 

  @IsNotEmpty()
  @IsString()
  readonly category: string;

}