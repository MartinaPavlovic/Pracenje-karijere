import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EntryPage from './pages/EntryPage';
import HomePage from './pages/HomePage';
import DepartmentPage from './pages/DepartmentPage';
import ListOfEmployees from './pages/ListOfEmployees';
import EmployeePage from './pages/EmployeePage';
import EditProfilePage from './pages/EditProfilePage';
import EmployeeLevelPage from './pages/EmployeeLevelPage';
import CommentPage from './pages/CommentPage';
import EvaluationListPage from './pages/EvaluationListPage';
import RequestList from './pages/RequestListPage';
import EvaluationPage from './pages/EvaluationPage';
import ApprovalPage from './pages/ApprovalPage';

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
        <Route path="/employeeLevel" element={<EmployeeLevelPage />} />
        <Route path="/addComment" element={<CommentPage />} />
        <Route path="/evaluationList" element={<EvaluationListPage />} />
        <Route path="/requestList" element={<RequestList />} />
        <Route path="/evaluation" element={<EvaluationPage />} />
        <Route path="/approval" element={<ApprovalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
