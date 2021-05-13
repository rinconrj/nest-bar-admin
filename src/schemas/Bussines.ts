import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BussinesDocument = Bussines & Document;

@Schema()
export class Bussines {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  userRef: string;

  @Prop()
  picture: string;
}

export const BussinesSchema = SchemaFactory.createForClass(Bussines);
