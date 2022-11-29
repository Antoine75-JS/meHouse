import { useEffect } from 'react';

const Homepage = () => {
  useEffect(() => {
    console.log('env ?', process.env.REACT_APP_API_URL);
    fetch(`${process.env.REACT_APP_API_URL}`).then((res) => console.log(res));
  }, []);
  return <div>Homepage</div>;
};

export default Homepage;
