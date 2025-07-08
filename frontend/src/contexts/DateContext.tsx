import React, { PropsWithChildren, useState } from 'react';

export interface DateContextProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export const DateContext = React.createContext<DateContextProps>({
  currentDate: new Date(),
  setCurrentDate: () => {},
});

const DateContext_: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <DateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </DateContext.Provider>
  );
};

const DateContextProvider = React.memo(DateContext_);

export default DateContextProvider;
