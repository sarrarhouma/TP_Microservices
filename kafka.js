const { Kafka } = require('kafkajs');
const kafka = new Kafka({
clientId: 'my-app',
brokers: ['localhost:9092']
});
const producer = kafka.producer();
const sendMessage = async (topic, message) => {
await producer.connect();
await producer.send({
topic,
messages: [{ value: JSON.stringify(message) }],
});
await producer.disconnect();
};
const consumer = kafka.consumer({ groupId: 'group-id' });
const consumeMessages = async (topic) => {
await consumer.connect();
await consumer.subscribe({ topic, fromBeginning: true });
await consumer.run({
eachMessage: async ({ topic, partition, message }) => {
console.log(`Received message: ${message.value.toString()}`);
// Traitez le message ici
},
});
};