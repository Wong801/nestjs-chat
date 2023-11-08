import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/api/modules/chats/chat.service';
import { JoinRoomDto, SendMessageDto } from './dtos/event.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;
  clientId: string;

  async handleConnection(client: Socket) {
    this.clientId = client.id;
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected with ID: ${client.id}`);
  }

  @SubscribeMessage('join_room')
  async createRoom(@MessageBody() payload: JoinRoomDto) {
    const chatRoom = await this.chatService.createRoom(this.clientId, payload);
    this.server.sockets.emit('joined_room', chatRoom._id);
  }

  @SubscribeMessage('send_message')
  async sendMessage(@MessageBody() payload: SendMessageDto) {
    const chat = await this.chatService.saveChat(payload);
    this.server.sockets.emit('receive_message', chat);
  }
}
