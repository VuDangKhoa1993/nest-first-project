import { Test, TestingModule } from '@nestjs/testing';
import { ProductionConfigService } from './production-config.service';

describe('ProductionConfigService', () => {
  let service: ProductionConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionConfigService],
    }).compile();

    service = module.get<ProductionConfigService>(ProductionConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
