import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceItem } from "./invoice-item.entity";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  idInvoice: number;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'datetime' })
  issueDate: Date;

  @OneToMany(() => InvoiceItem, item => item.invoice, {
    cascade: true,
    eager: true,
  })
  items: InvoiceItem[]; 

  @ManyToOne(() => User, user => user.invoices, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'idUser' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}