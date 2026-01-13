import { IsArray, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsArray()
  items!: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    type: string;
  }[];

  @IsOptional()
  @IsString()
  currency?: string;
}
