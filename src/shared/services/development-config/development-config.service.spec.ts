import { Test, TestingModule } from '@nestjs/testing';
import { DevelopmentConfigService } from './development-config.service';

describe('DevelopmentConfigService', () => {
  let service: DevelopmentConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevelopmentConfigService],
    }).compile();

    service = module.get<DevelopmentConfigService>(DevelopmentConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
