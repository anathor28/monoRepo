import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  console.log("RABBITMQ =>", process.env.RABBITMQ_URL, "MQTT =>", process.env.MQTT_URL);
  const app = await NestFactory.create(AppModule);

  // Supprimez les appels à connectMicroservice

  await app.listen(8096);
  console.log("API Gateway is listening on port 8096");
}
bootstrap();