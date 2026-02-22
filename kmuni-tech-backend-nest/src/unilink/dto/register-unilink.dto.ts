import { IsNotEmpty, IsString, MaxLength, MinLength, Matches } from 'class-validator';

export class RegisterUnilinkDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(80)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[+\d][\d]{7,19}$/u, { message: 'phone must be a valid number' })
  phone!: string;
}
