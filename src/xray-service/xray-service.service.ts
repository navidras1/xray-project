import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';
import { CreateXrayDTO } from 'src/dto/create-Xray.dto';
import { UpdateXrayDTO } from 'src/dto/update-Xray.dto';
import { IDevice } from 'src/Interfaces/xray.interface';

@Injectable()
export class XrayServiceService {
  constructor(@InjectModel('xray') private xrayModel: Model<IDevice>) {}

  createDevice(createXrayDTO: CreateXrayDTO): Promise<IDevice> {
    const newStudent = new this.xrayModel(createXrayDTO);
    return newStudent.save();
  }

  async getAllDevices(): Promise<IDevice[]> {
    const deviceData = await this.xrayModel.find();
    if (!deviceData || deviceData.length == 0) {
      throw new NotFoundException('device data not found!');
    }
    return deviceData;
  }

  async getDevicesByDeviceId(deviceId: string): Promise<IDevice[]> {
    const res = await this.xrayModel.find({ deviceId: deviceId });
    if (!res) {
      throw new NotFoundException('device not found!');
    }

    return res;
  }
  async getDevice(id: string): Promise<IDevice> {
    const res = await this.xrayModel.findOne({ _id: id });
    if (!res) {
      throw new NotFoundException('device not found!');
    }

    return res;
  }

  async deleteDevice(id: string): Promise<DeleteResult> {
    const res = await this.xrayModel.deleteOne({ _id: id });
    return res;
  }

  async updateDevice(
    id: string,
    updateXrayDTO: UpdateXrayDTO,
  ): Promise<IDevice> {
    const existingDevice = await this.xrayModel.findByIdAndUpdate(
      id,
      updateXrayDTO,
      { new: true },
    );
    if (!existingDevice) {
      throw new NotFoundException(`Student #${id} not found`);
    }
    return existingDevice;
  }
}
