import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { InvoiceItem } from './entities/invoice-item.entity';
import { PaginationDto } from 'src/common/pagination/pagination.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemRepository: Repository<InvoiceItem>,
    private readonly userService: UserService,
  ) {};

  async createInvoice(dto: CreateInvoiceDto, idUser: number) {
    const invoiceNumber = `NF-${Date.now()}`;

    const user = await this.userService.findUserById(idUser);

    // Criar intems no formato da entidade
    const items = dto.items.map(item => this.invoiceItemRepository.create(item));

    // Soma o valor total da nota
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Cria um nota fiscal com os dados completos
    const invoice = this.invoiceRepository.create({
      invoiceNumber,
      description: dto.description,
      issueDate: new Date(dto.issueDate),
      amount: totalAmount,
      items,
      user,
    });

    return this.invoiceRepository.save(invoice);
  };

  async findAllInvoice(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    
    const [ data, total ] = await this.invoiceRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
      relations: ['items']
    });

    return {
      data,
      meta: {
        total,
        limit,
        hasNextPage: total > offset + limit,
      },
    };
  };

   async findOne(idInvoice: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { idInvoice },
      relations: ['items'],
    });

    if (!invoice) throw new NotFoundException('Nota fiscal não encontrada');

    return invoice;
  }
}
