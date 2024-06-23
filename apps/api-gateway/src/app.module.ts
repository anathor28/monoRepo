import { RabbitMQService, MqttService } from "@banque-app/common";
import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";

@Module({
  imports: [],
  controllers: [],
  providers: [RabbitMQService, MqttService, MessageService],
})
export class AppModule {}
