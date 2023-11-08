import { Module } from '@nestjs/common';
import { chatProviders } from './chat.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  exports: [...chatProviders],
  providers: [...chatProviders],
  imports: [DatabaseModule],
})
export class ChatModule {}
