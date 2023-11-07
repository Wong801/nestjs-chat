import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class RegisterResponse extends OmitType(User, []) {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;

  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}

export class LoginResponse extends OmitType(User, []) {
  @ApiProperty({ type: String })
  accessToken: string;
}
