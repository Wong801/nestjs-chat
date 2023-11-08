import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat, ChatRoom } from './schemas/chat.schema';
import { Types } from 'mongoose';
import { JoinRoomDto, SendMessageDto } from 'src/events/dtos/event.dto';

@Injectable()
export class ChatService {
  constructor(
    @Inject('CHAT_ROOM_MODEL')
    private chatRoomModel: Model<ChatRoom>,

    @Inject('CHAT_MODEL')
    private chatModel: Model<Chat>,
  ) {}

  async createRoom(clientId: string, { roomId, userIds }: JoinRoomDto) {
    const room = await this.chatRoomModel.findOne({
      $or: [
        {
          users: userIds.map((userId) => new Types.ObjectId(userId)),
        },
        {
          _id: new Types.ObjectId(roomId),
        },
      ],
    });

    if (!room) {
      return await this.chatRoomModel.create({
        roomId: clientId,
        users: userIds.map((userId) => new Types.ObjectId(userId)),
      });
    }

    return room;
  }

  async saveChat({ message, from, reply }: SendMessageDto) {
    return await this.chatModel.create({
      from,
      message,
      replied: reply,
    });
  }
}
