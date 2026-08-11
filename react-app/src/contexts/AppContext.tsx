import React, { useState } from "react";
import type { UserType } from "../types";
import { _DUMMY_USER } from "../types";
import { getEmbedEnv } from "../utils/embedEnv";

type AppContextType = {
  userData: UserType;
  setUserDataHandler: (key: keyof UserType, value: string) => void;
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
};

const AppContext = React.createContext<AppContextType>({
  userData: _DUMMY_USER,
  setUserDataHandler: () => {},
  isInitialized: false,
  setIsInitialized: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = (props) => {
  const [userData, setUserData] = useState<UserType>(() => ({
    ..._DUMMY_USER,
    name: getEmbedEnv().username,
  }));
  const [isInitialized, setIsInitialized] = useState(false);

  const setUserDataHandler = (key: keyof UserType, value: string) => {
    setUserData((prevState: UserType) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserDataHandler: setUserDataHandler,
        isInitialized,
        setIsInitialized,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
