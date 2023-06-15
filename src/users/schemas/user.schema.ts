import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: false })
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
