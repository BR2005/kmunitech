import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateUnilinkEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @IsIn(['upcoming', 'finished'])
  status?: 'upcoming' | 'finished';
}
