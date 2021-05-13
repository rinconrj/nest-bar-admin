import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item } from './Item';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  id: string;

  @Prop([Item])
  items: Item[];

  @Prop()
  total: number;

  @Prop()
  taxTotal: number;

  @Prop()
  taxPercent: number;

  @Prop()
  descount: number;

  @Prop()
  status: string;

  @Prop()
  userRef: string;

  @Prop()
  bussinesRef: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
