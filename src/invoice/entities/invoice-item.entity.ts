import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Invoice } from "./invoice.entity";

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  idInvoiceItem: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;
  
  @ManyToOne(() => Invoice, invoice => invoice.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'idInvoice' })
  invoice: Invoice;
};