import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';


async function bootstrap() {
    const kafka = new Kafka({
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
    })

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notification',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade!',
                    category: 'social',
                    recipientId: randomUUID(),
                })
            }
        ]
    })

    await producer.disconnect()
}
bootstrap()