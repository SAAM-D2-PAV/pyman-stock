
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Tasks from "./components/Tasks";
import Task from './components/Task';
import FormTemplate from './components/FormTemplate';
import Add from './components/Add';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/accueil' element={<Home/>} />
          <Route path='/a-propos' element={<About/>} />
          <Route path='/taches' element={<Tasks/>} />
          <Route path="tache/:id" element={<Task/>} />
          <Route path="tache/:id/add" element={<Add/>} />
          {/* path='*' renvoyer une 404  */}
          <Route path='*' element={<Home/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
