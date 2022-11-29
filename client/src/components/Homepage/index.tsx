import { useEffect, useMemo } from 'react';
import { useFetch, TApiResponse } from '../../hooks/useFetch';

const Homepage = () => {
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API_URL}`);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      Homepage
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Homepage;
