import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  phone: string;

  @IsNotEmpty()
  address: string;
}
