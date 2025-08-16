export class Device {
  DeviceId: string;
  Data: Data[] = [];
  time: number;
}

export class Data {
  time: number;
  xray: Xray;
}

export class Xray {
  x: number;
  y: number;
  speed: number;
}
