import {
  Consumer,
  EachMessagePayload,
  Kafka,
  KafkaConfig,
  Producer,
} from "kafkajs";
import { MessageBroker } from "../types/broker";
import { handleProductUpdate } from "../productCache/productUpdateHandler";
import { handleToppingUpdate } from "../toppingCache/toppingUpdateHandler";
import config from "config";

export class KafkaBroker implements MessageBroker {
  private consumer: Consumer;
  private producer: Producer;

  constructor(clientId: string, brokers: string[]) {
    let kafkaConfig: KafkaConfig = {
      clientId,
      brokers,
    };

    if (process.env.NODE_ENV === "production") {
      kafkaConfig = {
        ...kafkaConfig,
        ssl: true,
        connectionTimeout: 45000,
        sasl: {
          mechanism: "plain",
          username: config.get("kafka.sasl.username"),
          password: config.get("kafka.sasl.password"),
        },
      };
    }
    const kafka = new Kafka(kafkaConfig);

    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: clientId });
  }

  async connectConsumer() {
    await this.consumer.connect();
  }

  async connectProducer() {
    await this.producer.connect();
  }

  async disconnectConsumer() {
    await this.consumer.disconnect();
  }

  async disconnectProducer() {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }

  /**
   *
   * @param topic - the topic to send the message to
   * @param message - The message to send
   * @throws {Error} - When the producer is not connected
   */
  async sendMessage(topic: string, message: string, key: string) {
    const data: { value: string; key?: string } = {
      value: message,
    };

    if (key) {
      data.key = key;
    }

    await this.producer.send({
      topic,
      messages: [data],
    });
  }

  async consumeMessage(topics: string[], fromBeginning: boolean = false) {
    await this.consumer.subscribe({ topics, fromBeginning });
    await this.consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        switch (topic) {
          case "product":
            await handleProductUpdate(message.value.toString());
            return;
          case "topping":
            await handleToppingUpdate(message.value.toString());
            return;
          default:
            console.log("Doing nothing");
        }
        console.log({
          value: message.value.toString(),
          topic,
          partition,
        });
      },
    });
  }
}
