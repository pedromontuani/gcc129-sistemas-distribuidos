import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext.tsx';

const useLoading = () => {
  const { setIsLoading, isLoading } = useContext(LoadingContext);

  return {
    isLoading,
    setIsLoading,
  };
};

export default useLoading;
