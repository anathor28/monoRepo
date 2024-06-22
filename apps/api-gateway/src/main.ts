import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  console.log("RABBITMQ =>",process.env.RABBITMQ_URL,"MQTT =>",process.env.MQTT_URL)
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
      queue: "api_gateway_queue",
      queueOptions: {
        durable: false,
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL || "mqtt://localhost:1883",
    },
  });

  await app.startAllMicroservices();
  await app.listen(8096);
  console.log("API Gateway is listening on port 8096");
}
bootstrap();
