import { Test, TestingModule } from '@nestjs/testing';
import { XrayServiceService } from './xray-service.service';

describe('XrayServiceService', () => {
  let service: XrayServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XrayServiceService],
    }).compile();

    service = module.get<XrayServiceService>(XrayServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
