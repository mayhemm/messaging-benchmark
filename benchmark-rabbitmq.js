const bench = require('nanobench')
const amqp = require('amqplib')

let connection
let channel

bench('RabbitMQ - connect', async (b) => {
    b.start()

    connection = await amqp.connect('amqp://rabbitmq')
    channel = await connection.createConfirmChannel()

    b.end()
})

bench('RabbitMQ - send 10.000 messages', async (b) => {
    b.start()

    const message = Buffer.from('Hello World!')
    
    for (let i = 0; i < 10000; i++)
        channel.sendToQueue('foo', message)

    await channel.waitForConfirms()

    b.end()
})

bench('RabbitMQ - disconnect', async (b) => {
    b.start()

    await channel.close()
    channel = undefined

    await connection.close()
    connection = undefined
    
    b.end()
})