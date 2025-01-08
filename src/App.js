import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import DepartmentPage from './pages/DepartmentPage';
import ListOfEmployees from './pages/ListOfEmployees';
import EmployeePage from './pages/EmployeePage';
import EditProfilePage from './pages/EditProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/subject" element={<DepartmentPage />} />
        <Route path="/listOfEmployees" element={<ListOfEmployees />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
