const bench = require('nanobench')
const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
    logLevel: logLevel.NOTHING
})

const producer = kafka.producer()

bench('Kafka - connect', async (b) => {
    b.start()
    await producer.connect()
    b.end()
})

bench('Kafka - send 10.000 messages', async (b) => {
    const messages = {
        topic: 'test-topic',
        messages: [
            {
                value: 'Hello KafkaJS user!'
            }
        ]
    }

    await producer.send(messages)

    b.start()
    for (let i = 0; i < 10000; i++)
        await producer.send(messages)
    b.end()
})

bench('Kafka - disconnect', async (b) => {
    b.start()
    await producer.disconnect()
    b.end()
})