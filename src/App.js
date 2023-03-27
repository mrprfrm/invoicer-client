import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home } from "./views/Home";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
