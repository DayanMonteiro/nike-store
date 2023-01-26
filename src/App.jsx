import React from "react";
import { Hero, Sales } from "./components";
import { heroapi, popularsales, toprateslaes } from "./data/data.js";

const App = () => {
  return (
    <>
      <main>
        <Hero heroapi={heroapi} />
        <Sales endpoint={popularsales} ifExists />
        <Sales endpoint={toprateslaes} />
      </main>
    </>
  );
};

export default App;
