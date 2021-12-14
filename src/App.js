import "./App.css";
import Model from "./components/Signout/index";
import Context from "./global/Context";
import Post from "./components/Post";
import Homee from "./components/Homee"
import Navbar2 from "./components/Navbar2";
import Setings from "./components/setings"
import Create from "./components/Create/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar2 />}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/signup" element={<Model/>}/>
            <Route path="/home" element={<Homee/>}/>
            <Route path="/settings" element={<Setings/>}/>



         
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
