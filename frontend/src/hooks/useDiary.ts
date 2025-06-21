import { useContext } from 'react';
import { DateContext } from '../contexts/dateContext/DateContext.tsx';

const useDiary = () => {
  const { currentDate, setCurrentDate } = useContext(DateContext);

  return {
    currentDate,
    setCurrentDate,
  };
};

export default useDiary;
