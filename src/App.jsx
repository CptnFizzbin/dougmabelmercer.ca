import React from 'react';

import Header from "./Header";
import Obituaries from "./obituaries/Obituaries";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Obituaries/>
      </main>
    </div>
  );
}

export default App;
