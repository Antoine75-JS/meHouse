const processMessage = async (content: any) => {
  if (!content) return;

  switch (content.action) {
    case 'GET_USER_NOTIFICATIONS':
      console.log('Consuming GET_USER_NOTIFICATIONS action', content.data);
      break;
    case 'CREATE_NOTIFICATION':
      console.log('Consuming CREATE_NOTIFICATION action', content.data);
      break;
    case 'DELETE_NOTIFICATION':
      console.log('Consuming DELETE_NOTIFICATION action', content.data);
      break;
    case 'SET_NOTIFICATION_READ':
      console.log('Consuming SET_NOTIFICATION_READ action', content.data);
      break;
    // Usefull ?
    case 'LOGIN':
      console.log('Consuming LOGIN action', content.data);
      break;
    case 'CHECK_LOGGED':
      console.log('Consuming CHECK_LOGIN action', content.data);
      break;
    case 'LOGOUT':
      console.log('Consuming LOGIN action', content.data);
      break;
    default:
      break;
  }
};

export default processMessage;
