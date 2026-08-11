import React, { useState } from "react";
import type { UserType } from "../types";
import { _DUMMY_USER } from "../types";
import { getEmbedEnv } from "../utils/embedEnv";

type AppContextType = {
  userData: UserType;
  setUserDataHandler: (key: keyof UserType, value: string) => void;
};

const AppContext = React.createContext<AppContextType>({
  userData: _DUMMY_USER,
  setUserDataHandler: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<Props> = (props) => {
  const [userData, setUserData] = useState<UserType>(() => ({
    ..._DUMMY_USER,
    name: getEmbedEnv().username,
  }));

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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
