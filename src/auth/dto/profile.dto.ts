import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Your password is too short! It must be 8 characters or more!',
  })
  readonly password: string;
}
