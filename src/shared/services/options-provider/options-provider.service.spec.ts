import { Test, TestingModule } from '@nestjs/testing';
import { OptionsProviderService } from './options-provider.service';

describe('OptionsProviderService', () => {
  let service: OptionsProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionsProviderService],
    }).compile();

    service = module.get<OptionsProviderService>(OptionsProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
