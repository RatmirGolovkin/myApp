import { IsNumber, IsString } from 'class-validator';

export class UpdateCatDto {
  @IsString()
  id: string;
  @IsString()
  name: string;
  @IsNumber()
  age: number;
  @IsString()
  breed: string;
}
