import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 'active'})
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);