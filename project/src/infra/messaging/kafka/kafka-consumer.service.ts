import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: 'notifications',
        brokers: ['cunning-insect-11143-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'Y3VubmluZy1pbnNlY3QtMTExNDMk5c6_HixuKaYRFARGMdcslpUenBZZWCg338s',
          password:
            'BOkqSizhcnPo_GHBcqY74gVwHv4wZAFvrV0UsAQ2VPRyAaKZCs02MyFZlxTiCOylBMmoSQ==',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
