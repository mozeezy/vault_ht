import React from "react";
import "./App.css";
import OBForm from "./components/OBForm/OBForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h4>Step 1 of 5</h4>
      </div>
      <OBForm />
    </div>
  );
};

export default App;
