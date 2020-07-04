import React from 'react';

import Comments from "./comments/Comments";
import Header from "./Header";
import Obituaries from "./obituaries/Obituaries";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Obituaries/>
        <Comments/>
      </main>
    </div>
  );
}

export default App;
