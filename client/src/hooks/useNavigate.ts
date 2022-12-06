import { redirect } from 'react-router-dom';

const useNavigate = (url: string) => {
  return redirect(url);
};

export default useNavigate;
