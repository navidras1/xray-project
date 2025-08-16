import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateXrayDTO } from 'src/dto/create-Xray.dto';
import { XrayServiceService } from 'src/xray-service/xray-service.service';
import { Response } from 'express'; // Import if using Express
import { UpdateXrayDTO } from 'src/dto/update-Xray.dto';

@Controller({ version: '1' })
export class XrayControllerController {
  constructor(private readonly xrayService: XrayServiceService) {}
  @Post('createXray')
  async createXray(
    @Res() response: Response,
    @Body() createXrayDTO: CreateXrayDTO,
  ) {
    try {
      const newXray = await this.xrayService.createDevice(createXrayDTO);
      return response.status(HttpStatus.CREATED).json({
        message: 'xray has been created successfully',
        result: newXray,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Device not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('getAllDevices')
  async getDevices(@Res() response: Response) {
    try {
      const deviceData = await this.xrayService.getAllDevices();

      //response.status(HttpStatus.OK).
      return response.status(HttpStatus.OK).json({
        message: 'All device data found successfully',
        result: deviceData,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Error: Device not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('getDeviceByDeviceId/:deviceId')
  async getDeviceByDeviceId(
    @Res() response: Response,
    @Param('deviceId') deviceId: string,
  ) {
    try {
      const res = await this.xrayService.getDevicesByDeviceId(deviceId);

      return response.status(HttpStatus.FOUND).json({
        message: 'Device data found successfully',
        result: res,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Error: Device not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('getDevice/:id')
  async getDevice(@Res() response: Response, @Param('id') id: string) {
    try {
      const res = await this.xrayService.getDevice(id);

      return response.status(HttpStatus.FOUND).json({
        message: 'Device data found successfully',
        result: res,
      });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Error: Device not found!',
        error: 'Bad Request',
      });
    }
  }

  @Get('deleteDevice/:id')
  async deleteDevice(@Res() response: Response, @Param('id') id: string) {
    try {
      const res = await this.xrayService.deleteDevice(id);
      return response.status(HttpStatus.OK).json({
        message: 'Device data found successfully',
        result: res,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        message: 'Error',
        error: 'Bad Request',
      });
    }
  }

  @Put('updateDevice/:id')
  async updateDevice(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() xrayupdate: UpdateXrayDTO,
  ) {
    const res = await this.xrayService.updateDevice(id, xrayupdate);
    try {
      return response.status(HttpStatus.OK).json({
        message: 'Device data found successfully',
        result: res,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 404,
        message: 'Error',
        error: 'Bad Request',
      });
    }
  }

  @EventPattern('my_pattern')
  async handleMessage(newDevice: CreateXrayDTO) {
    //const keys: string[] = Object.keys(res);
    try {
      const newXray = await this.xrayService.createDevice(newDevice);

      console.log('message created', newXray);
    } catch (error) {
      console.error('Error creating xray:', error);
    }

    // Add your message processing logic here
  }
}
