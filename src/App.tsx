import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from './Login';
import ToastList from './components/toast/ToastList';
import MainDash from './monthlyBudget/MainDash';
import NavBar from './components/navbar/NavBar';

function App() {
  return (
    <Router>
      <ToastList />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/monthlyBudget" element={<MainDash />} />
        <Route path="/yearlySummary"  element={<><NavBar /><h1 style={{color: 'black'}}>Yearly Summary Coming Soon</h1></>} />
      </Routes>
    </Router>
  );
}

export default App;