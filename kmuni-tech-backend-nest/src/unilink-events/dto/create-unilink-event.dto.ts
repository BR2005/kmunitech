import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateUnilinkEventDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsIn(['upcoming', 'finished'])
  status!: 'upcoming' | 'finished';
}
