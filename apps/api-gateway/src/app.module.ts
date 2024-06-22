import { RabbitMQService,MqttService } from '@banque-app/common/messaging';
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [RabbitMQServicen MqttService],
})
export class AppModule {}
