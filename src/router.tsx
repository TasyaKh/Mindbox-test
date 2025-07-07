import { Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';

const AppRouter = () => (
    <Routes>
      <Route path="/" element={<TodoPage />} />
    </Routes>
);

export default AppRouter; 
