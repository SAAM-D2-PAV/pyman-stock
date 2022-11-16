
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import Tasks from "./pages/Tasks";
import Task from './pages/Task';
import Add from './pages/Add';
import {useContext} from "react";
import AuthContext from "./context/AuthProvider";

const App = () => {
    const auth = useContext(AuthContext);

  return (
      auth.auth.accessToken ?
          <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/a-propos' element={<About/>} />
                <Route path='/taches' element={<Tasks/>} />
                <Route path="tache/:id" element={<Task/>} />
                <Route path="tache/:id/add" element={<Add/>} />
                <Route path='*' element={<Home/>} />
              {/* path='*' renvoyer une 404  */}
            </Routes>
          </BrowserRouter>
      :
          <BrowserRouter>

              <Routes>
                  <Route path='/connexion' element={<Login/>} />
                  <Route path='*' element={<Login/>} />
              </Routes>
          </BrowserRouter>
  );
}

export default App;
