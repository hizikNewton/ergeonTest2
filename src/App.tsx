import React from "react";
import "./App.css";
import { AutoComplete } from "./AutoComplete";
import { data } from "./data";

function App() {
  return (
    <div className="App">
      <header className="App-header">{"ERGERON TEST 2"}</header>
      <AutoComplete
        optionsStyle={{ backgroundColor: "LemonChiffon" }}
        data={data}
      />
    </div>
  );
}

export default App;
