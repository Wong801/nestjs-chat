import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Res,
  HttpCode,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './modules/user/user.service';
import {
  CreateProfileDto,
  UserLoginDto,
  UserRegisterDto,
} from './modules/user/dto/create-user.dto';
import { Request, Response } from 'express';
import { ApiGuard } from './api.guard';
import { UpdateProfileDto } from './modules/user/dto/update-user.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginResponse,
  RegisterResponse,
} from './modules/user/dto/create-user-response.dto';

@ApiTags('user')
@Controller('api')
export class ApiController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({
    description: 'User credential',
    type: UserRegisterDto,
  })
  @ApiCreatedResponse({
    type: RegisterResponse,
  })
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return await this.userService.register(userRegisterDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    description: 'User credential',
    type: UserLoginDto,
  })
  @ApiCreatedResponse({
    type: LoginResponse,
  })
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.userService.login(userLoginDto);
    res.cookie('jwt', data.accessToken, {});
    return data;
  }

  @UseGuards(ApiGuard)
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody({
    description: 'User profile',
    type: CreateProfileDto,
  })
  @Post('/createProfile')
  async createProfile(@Req() req: Request, @Body() body: CreateProfileDto) {
    return this.userService.upsertProfile((req as any).userId, body);
  }

  @UseGuards(ApiGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({
    description: 'User profile',
    type: UpdateProfileDto,
  })
  @Patch('/updateProfile')
  async updateProfile(@Req() req: Request, @Body() body: UpdateProfileDto) {
    return this.userService.upsertProfile((req as any).userId, body);
  }

  @UseGuards(ApiGuard)
  @Get('/getProfile')
  findOne(@Req() req: Request) {
    return this.userService.getProfile((req as any).userId);
  }
}
