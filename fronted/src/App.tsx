import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Board from './pages/Board';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/board" element={<Board />}></Route>
        </Routes>
    </Router>
  );
}

export default App
