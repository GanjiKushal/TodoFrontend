import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login-resgister';
import Register from './components/register';
import TodoList from './components/todoList';
import CreateNewActivity from './components/activity';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todoList" element={<TodoList/>}/>
          <Route path='/newActivity' element={<CreateNewActivity/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
