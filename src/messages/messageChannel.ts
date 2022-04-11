import { connect } from 'amqplib';

async function createMessageChannel() {
  try {
    const connection = await connect(process.env.AMQP_SERVER);

    const channel = await connection.createChannel();

    await channel.assertQueue(process.env.QUEUE_NAME);

    return channel;
  } catch(error) {
    console.error(error)
  }
};

export default createMessageChannel;
