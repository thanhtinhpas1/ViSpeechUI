const { Kafka, logLevel } = require('kafkajs');

const host = 'asr.vietspeech.com'

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'vispeech',
})

const consumer = kafka.consumer({ groupId: 'vispeech' })

module.exports = {
  run: async (topic, socket) => {
    console.info(`Kafka consumer subscribed ${topic}`);
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: false})
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        socket.emit(topic, message.value);
      },
    }).catch(err => console.error(err.message));
  },
  disconnect: async () => {
    try {
      await consumer.disconnect()
    } finally {
      // process.kill(process.pid, type)
    }
  }
}