
import './App.css';
import Navbar from './components/Navbar';
import Model from './components/Model'
import Context from './global/Context';
import Create from './components/Create';
import Post from './components/Post';


function App() {
  return (
    <Context>
        <Navbar />
        <div className="container">
          <Create/>
          <Post/>
          </div>
        <Model />
    </Context>
  );
}

export default App;
