
import './App.css';
import Navbar from './components/Navbar';
import Model from './components/Model'
import Context from './global/Context';

function App() {
  return (
    <Context>
        <Navbar />
        <Model />
    </Context>
  );
}

export default App;
