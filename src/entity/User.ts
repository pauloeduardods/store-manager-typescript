import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IOrder } from '../interfaces/entity';

@Entity('Users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  classe: string;

  @Column({ type: 'int' })
  level: number;

  @OneToMany('Order', 'user')
  orders: IOrder[];
}