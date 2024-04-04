import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/navbar/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="mx-auto w-[90vw] mt-[2vw]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
