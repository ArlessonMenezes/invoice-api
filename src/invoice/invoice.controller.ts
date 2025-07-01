import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards, Req } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auht.guard';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';

@ApiTags('Invoices')
@Controller('invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Emitir nova nota fiscal' })
  @ApiResponse({ status: 201, description: 'Nota fiscal criada com sucesso' })
  create(@Req() req: any, @Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(createInvoiceDto, req.user.idUser);
  }

  @Get()
  @ApiQuery({ type: PaginationDto })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.invoiceService.findAllInvoice(paginationDto);
  }

  @Get(':idInvoice')
  @ApiOperation({ summary: 'Buscar uma nota fiscal por ID' })
  @ApiResponse({ status: 200, description: 'Nota fiscal encontrada' })
  @ApiResponse({ status: 404, description: 'Nota fiscal não encontrada' })
  findOne(@Param('idInvoice', ParseIntPipe) idInvoice: number) {
    return this.invoiceService.findOne(idInvoice);
  }
}
