import React from "react";
import "./App.css";
import OBForm from "./components/OBForm/OBForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <h5>Step 1 of 5</h5>
      </div>
      <ToastContainer />
      <OBForm />
    </div>
  );
};

export default App;
