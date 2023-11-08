import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { User } from '../../user/schemas/user.schema';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
})
export class ChatRoom {
  @Prop({ unique: true, default: uuid() })
  name: string;

  @Prop({ unique: true })
  roomId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
  chats: Chat[];
}

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
})
export class Chat {
  @Prop({ type: { type: Types.ObjectId, ref: 'User' } })
  from: User;

  @Prop({ required: true })
  message: string;

  @Prop({ type: { type: Types.ObjectId, ref: 'Chat' } })
  replied?: Chat;
}

export type ChatRoomDocument = ChatRoom & Document;
export type ChatDocument = Chat & Document;

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
export const ChatSchema = SchemaFactory.createForClass(Chat);
