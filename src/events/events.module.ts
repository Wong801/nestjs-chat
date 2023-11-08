import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { ChatModule } from 'src/api/modules/chats/chat.module';

@Module({
  providers: [EventsGateway],
  imports: [ChatModule],
})
export class EventsModule {}
