import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class UpdatedUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(8, {
  //   message: 'Your password is too short! It must be 8 characters or more!',
  // })
  // readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNo: string;

}
