import "./App.css";
import Model from "./components/Signout/index";
import Context from "./global/Context";
import Homee from "./components/Homee";
import Profile from "./components/Profile";
import Navbar2 from "./components/Navbar2";
import Setings from "./components/setings";
import Create from "./components/Create/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Context>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar2 />} />
          <Route path="/create" element={<Create />} />
          <Route path="/signup" element={<Model />} />
          <Route path="/home" element={<Homee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/settings" element={<Setings />} />
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
