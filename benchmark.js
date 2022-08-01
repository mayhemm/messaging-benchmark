const bench = require('nanobench')
const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
    logLevel: logLevel.NOTHING
})

const redpanda = new Kafka({
    clientId: 'my-app',
    brokers: ['redpanda:9092'],
    logLevel: logLevel.NOTHING
})

const kafkaProducer = kafka.producer()
const redpandaProducer = redpanda.producer()

// ################## Kafka ##################
bench('Kafka - connect', async (b) => {
    b.start()
    await kafkaProducer.connect()
    b.end()
})

bench('Kafka - send 10.000 messages', async (b) => {
    const messages = {
        topic: 'test-topic',
        messages: [
            {value: 'Hello KafkaJS user!'}
        ]
    }

    await kafkaProducer.send(messages)
    await kafkaProducer.send(messages)

    b.start()
    for (let i = 0; i < 10000; i++)
        await kafkaProducer.send(messages)
    b.end()
})

bench('Kafka - disconnect', async (b) => {
    b.start()
    await kafkaProducer.disconnect()
    b.end()
})

// ################## Red Panda ##################
bench('Red Panda - connect', async (b) => {
    b.start()
    await redpandaProducer.connect()
    b.end()
})

bench('Red Panda - send 10.000 messages', async (b) => {
    const messages = {
        topic: 'test-topic',
        messages: [
            {value: 'Hello KafkaJS user!'}
        ]
    }

    await redpandaProducer.send(messages)
    await redpandaProducer.send(messages)

    b.start()
    for (let i = 0; i < 10000; i++)
        await redpandaProducer.send(messages)
    b.end()
})

bench('Red Panda - disconnect', async (b) => {
    b.start()
    await redpandaProducer.disconnect()
    b.end()
})