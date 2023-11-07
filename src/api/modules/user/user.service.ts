import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import {
  CreateProfileDto,
  UserLoginDto,
  UserRegisterDto,
} from './dto/create-user.dto';
import { User, UserProfile } from './schemas/user.schema';
import * as moment from 'moment';
import { UpdateProfileDto } from './dto/update-user.dto';
import { HOROSCOPES, ZODIACS } from './types/user.type';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    @Inject('USER_PROFILE_MODEL')
    private userProfileModel: Model<UserProfile>,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: UserRegisterDto) {
    if (body.confirmPassword !== body.password) {
      throw new HttpException(
        'Invalid password confirmation',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findOne({
      $or: [
        {
          email: body.email,
        },
        {
          username: body.username,
        },
      ],
    });
    if (user) {
      throw new HttpException(
        'Email or username already registered',
        HttpStatus.CONFLICT,
      );
    }

    const newUser: User = {
      email: body.email,
      username: body.username,
      password: body.password,
    };
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(body.password, salt);

    return await this.userModel.create(newUser);
  }

  async login(body: UserLoginDto) {
    const user = await this.userModel
      .findOne({
        $or: [
          {
            email: body.emailOrUsername,
          },
          {
            username: body.emailOrUsername,
          },
        ],
      })
      .select('+password');
    if (!user) {
      throw new HttpException('User not found', HttpStatus.CONFLICT);
    }

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const jwtPayload = {
      sub: user._id,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      accessToken,
    };
  }

  async getProfile(id: string) {
    return await this.userProfileModel
      .findOne({
        user: new Types.ObjectId(id),
      })
      .populate('user');
  }

  getHoroscope([date, month]: number[]): {
    horoscope: HOROSCOPES;
    zodiac: ZODIACS;
  } {
    switch (month) {
      case 1:
        if (date >= 20) {
          return {
            horoscope: HOROSCOPES.AQUARIUS,
            zodiac: ZODIACS.AQUARIUS,
          };
        }
        return {
          horoscope: HOROSCOPES.CAPRICORNUS,
          zodiac: ZODIACS.CAPRICORNUS,
        };
      case 2:
        if (date >= 19) {
          return {
            horoscope: HOROSCOPES.PISCES,
            zodiac: ZODIACS.PISCES,
          };
        }
        return {
          horoscope: HOROSCOPES.AQUARIUS,
          zodiac: ZODIACS.AQUARIUS,
        };
      case 3:
        if (date >= 21) {
          return {
            horoscope: HOROSCOPES.ARIES,
            zodiac: ZODIACS.ARIES,
          };
        }
        return {
          horoscope: HOROSCOPES.PISCES,
          zodiac: ZODIACS.PISCES,
        };
      case 4:
        if (date >= 20) {
          return {
            horoscope: HOROSCOPES.TAURUS,
            zodiac: ZODIACS.TAURUS,
          };
        }
        return {
          horoscope: HOROSCOPES.ARIES,
          zodiac: ZODIACS.ARIES,
        };
      case 5:
        if (date >= 21) {
          return {
            horoscope: HOROSCOPES.GEMINI,
            zodiac: ZODIACS.GEMINI,
          };
        }
        return {
          horoscope: HOROSCOPES.TAURUS,
          zodiac: ZODIACS.TAURUS,
        };
      case 6:
        if (date >= 21) {
          return {
            horoscope: HOROSCOPES.CANCER,
            zodiac: ZODIACS.CANCER,
          };
        }
        return {
          horoscope: HOROSCOPES.GEMINI,
          zodiac: ZODIACS.GEMINI,
        };
      case 7:
        if (date >= 23) {
          return {
            horoscope: HOROSCOPES.LEO,
            zodiac: ZODIACS.LEO,
          };
        }
        return {
          horoscope: HOROSCOPES.CANCER,
          zodiac: ZODIACS.CANCER,
        };
      case 8:
        if (date >= 23) {
          return {
            horoscope: HOROSCOPES.VIRGO,
            zodiac: ZODIACS.VIRGO,
          };
        }
        return {
          horoscope: HOROSCOPES.LEO,
          zodiac: ZODIACS.LEO,
        };
      case 9:
        if (date >= 23) {
          return {
            horoscope: HOROSCOPES.LIBRA,
            zodiac: ZODIACS.LIBRA,
          };
        }
        return {
          horoscope: HOROSCOPES.VIRGO,
          zodiac: ZODIACS.VIRGO,
        };
      case 10:
        if (date >= 23) {
          return {
            horoscope: HOROSCOPES.SCORPIUS,
            zodiac: ZODIACS.SCORPIUS,
          };
        }
        return {
          horoscope: HOROSCOPES.LIBRA,
          zodiac: ZODIACS.LIBRA,
        };
      case 11:
        if (date >= 22) {
          return {
            horoscope: HOROSCOPES.SAGITTARIUS,
            zodiac: ZODIACS.SAGITTARIUS,
          };
        }
        return {
          horoscope: HOROSCOPES.SCORPIUS,
          zodiac: ZODIACS.SCORPIUS,
        };
      case 12:
        if (date >= 22) {
          return {
            horoscope: HOROSCOPES.CAPRICORNUS,
            zodiac: ZODIACS.CAPRICORNUS,
          };
        }
        return {
          horoscope: HOROSCOPES.SAGITTARIUS,
          zodiac: ZODIACS.SAGITTARIUS,
        };
      default:
        throw new HttpException('Invalid Date', HttpStatus.BAD_REQUEST);
    }
  }

  async upsertProfile(id: string, body: CreateProfileDto | UpdateProfileDto) {
    const { horoscope, zodiac } = this.getHoroscope(
      body.doB.split(' ').map((val) => Number(val)),
    );
    body.horoscope = horoscope;
    body.zodiac = zodiac;

    body.doB = moment(body.doB, 'DD MM YYYY').format('YYYY-MM-DD').toString();

    const profile = await this.userProfileModel.findOneAndUpdate(
      {
        user: new Types.ObjectId(id),
      },
      { ...body },
      {
        new: true,
      },
    );

    if (profile) {
      return profile;
    }

    return await this.userProfileModel.create({
      user: new Types.ObjectId(id),
      ...body,
    });
  }
}
