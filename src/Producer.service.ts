import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { rabbitMQConfig } from './rabbitmq.options';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class ProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create(rabbitMQConfig());
  }

  async sendMessage(pattern: string, data: any) {
    //return  this.client.send(pattern,data);
    await firstValueFrom(
      this.client.emit(pattern, data).pipe(
        catchError((exception: Error) => {
          return throwError(() => new Error(exception.message));
        }),
      ),
    );
    // return this.client.send(pattern, data).pipe(
    //   catchError((exception: Error) => {
    //     return throwError(() => new Error(exception.message));
    //   }),
    // );
  }
}
