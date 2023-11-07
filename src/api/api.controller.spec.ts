import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserModule } from './modules/user/user.module';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService],
      imports: [UserModule],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
