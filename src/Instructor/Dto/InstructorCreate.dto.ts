import {  IsEmail, IsNotEmpty, IsNumber, IsString, MinLength} from 'class-validator';

export class InstructorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email'})
  readonly email: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(10,{
    message: 'Phone Number must be of 10 characters !',
})
  readonly phoneNo:string; 

  @IsNotEmpty()
  @IsString()
  readonly category: string;

}