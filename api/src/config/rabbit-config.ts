import amqp, { Connection } from 'amqplib/callback_api';

const createQMChannel = (amqpUrl: string, queueName: string) => {
  console.log('Connecting to RabbitMQ...');
  let ch: any;
  amqp.connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect);
      return;
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        console.log('Error creating channel: ', errorChannel);
        return;
      }

      ch = channel;
      console.log('Connected to RabbitMQ');
    });
  });
  return (msg: string) => {
    console.log('Produce message to RabbitMQ...');
    ch.sendToQueue(queueName, Buffer.from(msg));
  };
};

const producer = createQMChannel(
  process.env.RABBIT_HOSTNAME,
  process.env.RABBIT_QUEUE_NAME
);

export default producer;
