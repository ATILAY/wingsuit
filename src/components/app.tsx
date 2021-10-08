import React from "react";
import { Home } from "../containers";
import { AppContextProvider } from "../context";
import { getPointsFromLocalStorage } from "../service";

export const App: React.FC = () => {
  const points = getPointsFromLocalStorage();

  return (
    <AppContextProvider data={points}>
      <Home />
    </AppContextProvider>
  );
};
