import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development'],
      isGlobal: true,
    }),
    ApiModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
