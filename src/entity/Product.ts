import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IOrder } from '../interfaces/entity';

@Entity('Products')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  amount: string;

  @Column({ type: 'int' })
  orderId: number;

  @ManyToOne('Order', 'id')
  @JoinColumn({ name: 'orderId' })
  order: IOrder;
}