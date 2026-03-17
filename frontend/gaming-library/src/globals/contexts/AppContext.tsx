import React, { ReactNode, useContext, createContext } from "react";

type AppContextPropsType = {
  children: ReactNode;
};

export type AppContextType = {
  value: string;
};

const defaultContextValue: AppContextType = {
  value: "",
};

const AppContext = createContext(defaultContextValue);

function AppContextProvider(props: AppContextPropsType) {
  const { children } = props;
  const value = "test";

  const context = (): AppContextType => {
    return {
      value,
    };
  };
  return (
    <AppContext.Provider value={context()}>{children}</AppContext.Provider>
  );
}

export const useAppContext = (): AppContextType => useContext(AppContext);

export default AppContextProvider;
