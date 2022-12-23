import amqp, { Message } from 'amqplib/callback_api';
import processMessage from '../services/consumeMessage';

const createMQConsumer = (amqpURl: string = '', queueName: string = '') => {
  console.log('Connecting to RabbitMQ...');
  return () => {
    amqp.connect(amqpURl, async (errConn, conn) => {
      if (errConn) {
        throw errConn;
      }

      conn.createChannel(async (errChan, chan) => {
        if (errChan) {
          throw errChan;
        }

        console.log('Connected to RabbitMQ');
        chan.assertQueue(queueName, { durable: false });
        chan.consume(
          queueName,
          async (msg: Message | null) => {
            if (msg) {
              const content = msg.content;
              const parsed = JSON.parse(content.toString());

              await processMessage(parsed);

              chan.ack(msg);
            }
          },
          { noAck: false }
        );
      });
    });
  };
};

export default createMQConsumer;
