import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './Producer.service';
import { Message } from './Models/Message';
import { Data, Device, Xray } from './Models/Device';
import { CreateXrayDTO } from './dto/create-Xray.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async sendMessage(@Body() message: Message) {
    // const mm = { name: 'navid' };

    var keys: string[] = Object.keys(message.Device);

    const device: Device = new Device();
    device.DeviceId = keys[0];
    device.Data = [];
    const data: any = message.Device[keys[0]].data;
    device.time = message.Device[keys[0]].time;
    data.map((x) => {
      let d: Data = new Data();
      d.time = x[0];
      d.xray = new Xray();
      d.xray.x = x[1][0];
      d.xray.y = x[1][1];
      d.xray.speed = x[1][2];
      device.Data.push(d);
      //x[0]
    });
    const createXrayDTO: CreateXrayDTO = new CreateXrayDTO();
    createXrayDTO.deviceId = device.DeviceId;
    createXrayDTO.time = device.time;
    createXrayDTO.dataLength = device.Data.length;
    // device.Data.reduce(x=> x.xray.speed, 0);
    let totalVol: number = 0;
    device.Data.forEach((x) => {
      totalVol += x.xray.speed * x.xray.x * x.xray.y; // Assuming speed is in m/s, x and y in cm
    });
    createXrayDTO.dataVolume = totalVol; // Convert to m^3

    await this.producerService.sendMessage('my_pattern', createXrayDTO);
    return 'Message sent!';
  }
}
