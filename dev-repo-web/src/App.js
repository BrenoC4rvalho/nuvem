import React, { useContext } from "react";

import AppRoutes from './appRoutes';

import { AuthContext } from "./contexts/auth";

function App() {
  return (
      <AuthContext.Provider value={{ userId: '123'}}>
        <AppRoutes /> 
      </AuthContext.Provider>
    );
}

export default App;
