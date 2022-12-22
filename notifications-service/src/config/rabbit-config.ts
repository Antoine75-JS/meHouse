import amqp, { Message } from 'amqplib/callback_api';

const {
  getUserNotifications
} = require('../controllers/invitationsController');

const createMQConsumer = (amqpURl: string = '', queueName: string = '') => {
  console.log('Connecting to RabbitMQ...');
  return () => {
    amqp.connect(amqpURl, (errConn, conn) => {
      if (errConn) {
        throw errConn;
      }

      conn.createChannel((errChan, chan) => {
        if (errChan) {
          throw errChan;
        }

        console.log('Connected to RabbitMQ');
        chan.assertQueue(queueName, { durable: false });
        chan.consume(
          queueName,
          (msg: Message | null) => {
            if (msg) {
              const parsed = JSON.parse(msg.content.toString());
              console.log('action : ', parsed.action, 'message', msg);
              switch (parsed.action) {
                case 'GET_USER_NOTIFICATIONS':
                  console.log(
                    'Consuming GET_USER_NOTIFICATIONS action',
                    parsed.data
                  );
                  break;
                case 'LOGIN':
                  console.log('Consuming LOGIN action', parsed.data);
                  break;
                case 'CHECK_LOGIN':
                  console.log('Consuming CHECK_LOGIN action', parsed.data);
                  getUserNotifications(parsed.data);

                  break;
                case 'LOGOUT':
                  console.log('Consuming LOGIN action', parsed.data);
                  break;
                default:
                  break;
              }
            }
          },
          { noAck: true }
        );
      });
    });
  };
};

export default createMQConsumer;
