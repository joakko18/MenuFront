import './App.css';
import { Link } from 'react-router-dom';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login/>
        
        <Link
          className="App-link"
          to="/Menu"
        >
          
        </Link>
       
      </header>
    </div>
  );
}

export default App;
