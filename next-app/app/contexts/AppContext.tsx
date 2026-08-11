"use client";
import React, { useEffect, useState } from "react";
import { UserType, _DUMMY_USER } from "@/app/types";
import { getEmbedEnv } from "@/app/utils/embedEnv";

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
  const [userData, setUserData] = useState(_DUMMY_USER);

  useEffect(() => {
    // Reflect the saved username (from the env config form / localStorage)
    // once we are on the client.
    setUserData((prev) => ({ ...prev, name: getEmbedEnv().username }));
  }, []);

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
