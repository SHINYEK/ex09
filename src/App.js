import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Router } from 'react-router-dom';
import Menu from './Menu';

function App() {
  return (
    <div className="App">
      <Header/>
        <Menu/>
      <Footer/>
    </div>
  );
}

export default App;
