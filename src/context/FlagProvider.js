import React, { createContext, useContext, useState } from 'react';

const FlagContext = createContext();

const FlagProvider = ({ children }) => {
  const [loginflag, setLoginflag] = useState(false);

  return (
    <FlagContext.Provider
      value={{
        loginflag,
        setLoginflag,
      }}
    >
      {children}
    </FlagContext.Provider>
  );
};

export const FlagState = () => {
  return useContext(FlagContext);
};

export default FlagProvider;
