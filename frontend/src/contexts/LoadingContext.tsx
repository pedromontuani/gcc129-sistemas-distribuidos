import React, { PropsWithChildren, useState } from 'react';

export interface LoadingContextProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const LoadingContext = React.createContext<LoadingContextProps>({
  isLoading: false,
  setIsLoading: () => {},
});

const LoadingContext_: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

const LoadingContextProvider = React.memo(LoadingContext_);

export default LoadingContextProvider;
