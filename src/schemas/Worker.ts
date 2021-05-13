import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkerDocument = Worker & Document;

@Schema()
export class Worker {
  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  birthdate: string;

  @Prop()
  type: string;

  @Prop()
  userRef: string;

  @Prop()
  bussinesRef: string;

  @Prop()
  picture: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
