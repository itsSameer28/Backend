import { IsNotEmpty, IsString } from 'class-validator';

export class TypeCreateDto {

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

}
