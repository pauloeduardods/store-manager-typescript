import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IProduct, IUser } from '../interfaces';

@Entity('Orders')
export default class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne('User', 'id')
  @JoinColumn({ name: 'userId' })
  user: IUser;

  @OneToMany('Product', 'order')
  products: IProduct[];
}