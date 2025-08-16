import { Test, TestingModule } from '@nestjs/testing';
import { XrayControllerController } from './xray-controller.controller';

describe('XrayControllerController', () => {
  let controller: XrayControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XrayControllerController],
    }).compile();

    controller = module.get<XrayControllerController>(XrayControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
