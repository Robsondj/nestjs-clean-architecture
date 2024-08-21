import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class AddProductDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '',
    required: true,
  })
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 0.0,
    required: true,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '99999-999',
    pattern: '^\\d{5}-\\d{3}',
    required: true,
  })
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '',
    required: true,
  })
  seller: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'https://cdn.aws.com.br/600x450/21/21351/produto/image.jpg',
    required: true,
  })
  thumbnailHd: string;

  @IsOptional()
  @ApiProperty({
    example: '2024-01-01',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  activateDate: string;
}
