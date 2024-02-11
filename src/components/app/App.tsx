import React from "react";
import AppHeader from "../appHeader/AppHeader.tsx";
import AppRouter from "../router/AppRouter.tsx";
const App = () => {
  return (
    <div data-testid="app" className="app">
      <AppHeader />
      <main>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
