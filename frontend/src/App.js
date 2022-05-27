import './App.css';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListCards from './components/ListCards/ListCards';

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path="deck/:_id" element={<ListCards />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
