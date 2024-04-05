import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/home";

function App() {
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
