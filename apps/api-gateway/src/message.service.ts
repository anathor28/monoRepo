import { MqttService, RabbitMQService } from "@banque-app/common";
import { Injectable, OnModuleInit } from "@nestjs/common";

@Injectable()
export class MessageService implements OnModuleInit {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly mqttService: MqttService
  ) {}

  async onModuleInit() {
    await this.initializeRabbitMQ();
    await this.initializeMQTT();
  }

  private async initializeRabbitMQ() {
    // Configurez RabbitMQ ici
    await this.rabbitMQService.initialize(
      process.env.RABBITMQ_URL || "amqp://user:password@localhost:5672"
    );
  }
  private async initializeMQTT() {
    // Configurez MQTT ici
    await this.mqttService.initialize(
      process.env.MQTT_URL || "mqtt://localhost:1883"
    );
  }

  async rmqSendMessage() {
    await this.rabbitMQService.produce("queue_name", "Hello, RabbitMQ!");
  }

  async rmqStartConsuming() {
    await this.rabbitMQService.consume("queue_name", (msg) => {
      if (msg) {
        console.log(msg.content.toString());
        // Traitement du message
      }
    });
  }

  async mqttSendMessage() {
    await this.mqttService.produce("your/topic", { message: "Hello, MQTT!" });
  }

  async mqttConsuming() {
    this.mqttService.consume(
      ["topic1", "topic2/#", "sensor/+/temperature"],
      (topic, message) => {
        console.log(
          `Received message on topic ${topic}: ${message.toString()}`
        );
        // Traitement du message
      }
    );
  }
}
