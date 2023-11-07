import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  GENDERS,
  HOROSCOPES,
  ZODIACS,
  type UserHeight,
  UserWeight,
} from '../types/user.type';

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
})
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ select: false, required: true })
  password: string;
}

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
})
export class UserProfile {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  displayName: string;

  @Prop({ type: String, enum: GENDERS })
  gender: string;

  @Prop()
  about: string;

  @Prop()
  doB: Date;

  @Prop({ type: String, enum: HOROSCOPES })
  horoscope: string;

  @Prop({ type: String, enum: ZODIACS })
  zodiac: string;

  @Prop({ type: Object })
  height: UserHeight;

  @Prop({ type: Object })
  weight: UserWeight;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Interest' }] })
  interests: Interest[];
}

@Schema({
  timestamps: true,
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
})
export class Interest {
  @Prop()
  title: string;
}

export type UserDocument = User & Document;
export type UserProfileDocument = UserProfile & Document;
export type InterestDocument = Interest & Document;

export const UserSchema = SchemaFactory.createForClass(User);
export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
export const InterestSchema = SchemaFactory.createForClass(Interest);
