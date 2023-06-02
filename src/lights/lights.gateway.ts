import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { LightsService } from './lights.service';
import { UpdateLightDto } from './dto/update-light.dto';
import { Server } from "socket.io";

@WebSocketGateway()
export class LightsGateway {
  constructor(private readonly lightsService: LightsService) {}

  @WebSocketServer()
  server: Server;

  // handleConnection (client:any, ...args: any[]) {
  //   console.log(client);
  // }


  @SubscribeMessage('findAllLights')
  findAll() {
    return this.lightsService.findAll();
  }

  @SubscribeMessage('updateLight')
  update(@MessageBody() updateLightDto: UpdateLightDto) {
    return this.lightsService.update(updateLightDto.id, updateLightDto);
  }
}
