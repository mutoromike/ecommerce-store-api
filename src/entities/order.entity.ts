import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

import { Base } from './base';
import { ProductItem } from './product-item.entity';
import { User } from './user.entity';
import { Delivery } from './delivery.entity';

export enum OrderStatus {
  Cart = 'cart',
  Delivery = 'delivery',
  Complete = 'complete',
  Canceled = 'canceled',
}

@Entity()
export class Order extends Base {
  @Column({ nullable: true })
  totalAmount: number;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.Cart,
  })
  orderStatus: OrderStatus;

  @OneToMany(type => ProductItem, productItem => productItem.order, {
    eager: true,
    cascade: true,
  })
  items: ProductItem[];

  @ManyToOne(type => User, user => user.orders, { eager: true, cascade: true })
  user: User;

  @ManyToOne(type => Delivery, delivery => delivery.orders)
  delivery: Promise<Delivery>;
}
