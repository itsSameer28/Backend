import { IsEmail, IsNotEmpty,  IsString, } from 'class-validator';

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}
