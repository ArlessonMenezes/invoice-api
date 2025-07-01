import { Type } from "class-transformer";
import { ArrayMinSize, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreateInvoiceItemDto } from "./create-invoice-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInvoiceDto {
  @ApiProperty({ example: 'Compra de equipamentos de TI', description: 'Descrição da nota fiscal' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2025-06-27T12:00:00Z', description: 'Data de emissão da nota' })
  @IsDateString()
  issueDate: string;

  @ApiProperty({
    description: 'Lista de itens da nota fiscal',
    type: [CreateInvoiceItemDto],
  })
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}