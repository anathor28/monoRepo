import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client!: mqtt.MqttClient;

  async onModuleInit() {
    // L'initialisation sera faite explicitement avec la méthode initialize
  }

  async onModuleDestroy() {
    return this.disconnect();
  }

  /**
   * Initialise la connexion MQTT avec l'URL fournie.
   * @param url - L'URL de connexion au broker MQTT
   */
  async initialize(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client = mqtt.connect(url);

      this.client.on('connect', () => {
        console.log('Connected to MQTT broker');
        resolve();
      });

      this.client.on('error', (error: Error) => {
        console.error('MQTT connection error', error);
        reject(error);
      });
    });
  }

  /**
   * Publie un message sur un topic spécifié.
   * @param topic - Le topic sur lequel publier
   * @param message - Le message à publier (peut être un objet JSON, une chaîne ou un Buffer)
   * @param options - Options de publication MQTT (optionnel)
   */
  async produce(topic: string, message: any, options?: mqtt.IClientPublishOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let payload: string | Buffer;

      if (typeof message === 'object') {
        payload = JSON.stringify(message);
      } else if (typeof message === 'string') {
        payload = message;
      } else if (Buffer.isBuffer(message)) {
        payload = message;
      } else {
        payload = String(message);
      }

      this.client.publish(topic, payload, options, (error?: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * S'abonne à un ou plusieurs topics et gère les messages reçus.
   * @param topics - Un topic ou un tableau de topics auxquels s'abonner (peut inclure les wildcards MQTT # et +)
   * @param callback - Fonction de rappel à exécuter lorsqu'un message est reçu
   */
  consume(topics: string | string[], callback: (topic: string, message: Buffer) => void): void {
    const topicsToSubscribe = Array.isArray(topics) ? topics : [topics];

    this.client.subscribe(topicsToSubscribe, (err) => {
      if (err) {
        console.error('Error subscribing to topics:', err);
      } else {
        console.log('Subscribed to topics:', topicsToSubscribe);
      }
    });

    this.client.on('message', (receivedTopic: string, message: Buffer) => {
      if (topicsToSubscribe.some(topic => this.topicMatches(receivedTopic, topic))) {
        callback(receivedTopic, message);
      }
    });
  }

  /**
   * Vérifie si un topic correspond à un pattern (en prenant en compte les wildcards MQTT # et +)
   * @param receivedTopic - Le topic reçu
   * @param subscriptionTopic - Le pattern de souscription
   */
  private topicMatches(receivedTopic: string, subscriptionTopic: string): boolean {
    const receivedParts = receivedTopic.split('/');
    const subscriptionParts = subscriptionTopic.split('/');

    if (receivedParts.length < subscriptionParts.length) {
      return false;
    }

    for (let i = 0; i < subscriptionParts.length; i++) {
      if (subscriptionParts[i] === '#') {
        return true;
      }
      if (subscriptionParts[i] !== '+' && subscriptionParts[i] !== receivedParts[i]) {
        return false;
      }
    }

    return receivedParts.length === subscriptionParts.length;
  }

  /**
   * Déconnecte le client MQTT.
   */
  private async disconnect(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this.client && this.client.connected) {
        this.client.end(false, () => {
          console.log('Disconnected from MQTT broker');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}