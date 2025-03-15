import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:' + client.id);
  }

  @SubscribeMessage('mensaje')
  handleMessages(@ConnectedSocket() client: Socket ,@MessageBody() data: any) {
    console.log(data);
    // con this.server.emit enviamos el mensaje a todos los clientes conectados
    //this.server.emit('mensajeserver', data);
    client.broadcast.emit('mensajeserver', data);
  }
}
