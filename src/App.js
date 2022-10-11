
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Tasks from "./components/Tasks";
const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/accueil' element={<Home/>} />
          <Route path='/a-propos' element={<About/>} />
            <Route path='/taches' element={<Tasks/>} />
          {/* path='*' renvoyer une 404  */}
          <Route path='*' element={<Home/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
