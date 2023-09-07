import { IsNotEmpty, IsNumber, IsString,  } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  readonly rating: string;

  @IsNotEmpty()
  @IsString()
  readonly tittle: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly instructor: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  readonly videoLink: string;

  @IsNotEmpty()
  @IsString()
  readonly price: string;
}
