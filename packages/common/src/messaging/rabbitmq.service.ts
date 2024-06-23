import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import * as amqp from "amqplib";

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private healthCheckTimer: NodeJS.Timeout | null = null;
  private connectionString: string;

  /**
   * Initialise la connexion RabbitMQ lors du démarrage du module.
   * @param connectionString - Chaîne de connexion RabbitMQ - (ex: "amqp://user:password@localhost:5672")
   */
  async initialize(connectionString: string): Promise<void> {
    this.connectionString = connectionString;
    await this.connect();
    this.startHealthCheck();
  }

  async onModuleInit() {}

  /**
   * Ferme proprement la connexion RabbitMQ lors de l'arrêt du module.
   */
  async onModuleDestroy() {
    await this.closeConnection();
  }

  /**
   * Établit une connexion à RabbitMQ et crée un canal.
   * Tente de se reconnecter en cas d'échec.
   */
  private async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.connectionString);
      this.channel = await this.connection.createChannel();

      console.log("Connected to RabbitMQ");

      this.connection.on("error", (err) => {
        console.error("RabbitMQ connection error", err);
        this.scheduleReconnect();
      });

      this.connection.on("close", () => {
        console.log("RabbitMQ connection closed");
        this.scheduleReconnect();
      });
    } catch (error) {
      console.error("Failed to connect to RabbitMQ", error);
      this.scheduleReconnect();
    }
  }

  /**
   * Planifie une tentative de reconnexion.
   */
  private scheduleReconnect(): void {
    if (!this.reconnectTimer) {
      this.reconnectTimer = setTimeout(() => this.connect(), 5000);
    }
  }

  /**
   * Démarre un contrôle de santé périodique de la connexion.
   */
  private startHealthCheck(): void {
    this.healthCheckTimer = setInterval(() => this.checkConnection(), 30000);
  }

  /**
   * Vérifie l'état de la connexion et tente de se reconnecter si nécessaire.
   */
  private async checkConnection(): Promise<void> {
    if (!this.connection || !this.channel) {
      await this.connect();
    }
  }

  /**
   * Publie un message dans une queue spécifiée.
   * @param queue - Nom de la queue
   * @param message - Message à publier
   * @param options - Options de publication
   */
  async produce(
    queue: string,
    message: string | Buffer,
    options: amqp.Options.Publish = {}
  ): Promise<boolean> {
    try {
      if (!this.channel) {
        await this.connect();
      }
      await this.channel!.assertQueue(queue, { durable: true });
      return this.channel!.sendToQueue(queue, Buffer.from(message), options);
    } catch (error) {
      console.error("Failed to publish message", error);
      return false;
    }
  }

  /**
   * Consomme des messages d'une ou plusieurs queues.
   * @param queues - Nom(s) de la/les queue(s)
   * @param callback - Fonction de rappel pour traiter les messages
   * @param options - Options de consommation
   */
  async consume(
    queues: string | string[],
    callback: (msg: amqp.ConsumeMessage | null) => void,
    options: amqp.Options.Consume = {}
  ): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const queueArray = Array.isArray(queues) ? queues : [queues];

    for (const queue of queueArray) {
      await this.channel!.assertQueue(queue, { durable: true });
      await this.channel!.consume(queue, callback, options);
    }
  }

  /**
   * Ferme proprement la connexion et les canaux RabbitMQ.
   */
  private async closeConnection(): Promise<void> {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    this.channel = null;
    this.connection = null;
  }
}
