import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client!: mqtt.MqttClient;

  async onModuleInit() {
    this.client = mqtt.connect(process.env.MQTT_URL || 'mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error: Error) => {
      console.error('MQTT connection error', error);
    });
  }

  async onModuleDestroy() {
    return new Promise<void>((resolve) => {
      this.client.end(false, () => {
        resolve();
      });
    });
  }

  publish(topic: string, message: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.publish(topic, message, (error?: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  subscribe(topic: string, callback: (topic: string, message: Buffer) => void) {
    this.client.subscribe(topic);
    this.client.on('message', (receivedTopic: string, message: Buffer) => {
      if (receivedTopic === topic) {
        callback(topic, message);
      }
    });
  }
}