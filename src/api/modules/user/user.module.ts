import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../../../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [...userProviders],
  exports: [...userProviders],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
})
export class UserModule {}
