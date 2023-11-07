import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
})
export class ApiModule {}
