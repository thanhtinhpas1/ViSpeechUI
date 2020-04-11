module.exports = {
  run: async (consumer, topic, socket) => {
    console.info(`Kafka consumer subscribed ${topic}`);
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: false })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        socket.emit(topic, message.value);
      },
    }).catch(err => console.error(err.message));
  },
}