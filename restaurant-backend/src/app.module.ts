import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MesaController } from './mesa/mesa.controller';
import { MesaGateway } from './mesa/mesa.gateway';
import { MesaModule } from './mesa/mesa.module';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [PedidoModule, MesaModule],
  controllers: [PedidoController, MesaController, AppController],
  providers: [AppService, MesaGateway],
})
export class AppModule {}
