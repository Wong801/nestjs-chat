import { Connection } from 'mongoose';
import { ChatRoomSchema, ChatSchema } from './schemas/chat.schema';
import { ChatService } from './chat.service';

export const chatProviders = [
  {
    provide: 'CHAT_ROOM_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('ChatRoom', ChatRoomSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CHAT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Chat', ChatSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  ChatService,
];
