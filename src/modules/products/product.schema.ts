import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true, min: 0.01 })
  price: number;

  @Prop()
  category?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
