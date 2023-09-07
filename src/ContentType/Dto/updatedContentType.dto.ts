import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto {

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

}
