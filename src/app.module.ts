/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProducerService } from './Producer.service';
import { ConsumerController } from './ConsumerController';
import { MessageController } from './MessageController';
import { MongooseModule } from '@nestjs/mongoose';

import { XraySchema } from './schemas/xray.schema';
import { XrayServiceService } from './xray-service/xray-service.service';
import { XrayControllerController } from './xray-controller/xray-controller.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/xraydb'),
    MongooseModule.forFeature([{ name: 'xray', schema: XraySchema }]),
  ],
  controllers: [
    AppController,
    ConsumerController,
    MessageController,
    XrayControllerController,
  ],
  providers: [AppService, ProducerService, XrayServiceService],
})
export class AppModule {}
