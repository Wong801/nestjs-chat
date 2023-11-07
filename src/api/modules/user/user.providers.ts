import { Connection } from 'mongoose';
import {
  InterestSchema,
  UserProfileSchema,
  UserSchema,
} from './schemas/user.schema';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/create-user.dto';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_PROFILE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('UserProfile', UserProfileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'INTEREST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Interest', InterestSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  UserService,
  UserRegisterDto,
];
