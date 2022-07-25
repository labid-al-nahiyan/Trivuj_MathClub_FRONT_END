import './App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Component/Home/Home'
import Home from './Component/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from './Component/Header/Header';
import Login from './Component/Login/Login';
import ProblemSet from './Component/ProblemSet/ProblemSet';
import { createContext, useState } from 'react';
import Contest from './Component/Contest/Contest';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
export   const UserContext=createContext();

function App() {

  const [loggedInUser, setLoggedInUser]=useState({});

  return (
    <div className='container-fluid'>
      
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

      <Router>
        <Header></Header>

        <Routes>
          <Route path='/' element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
          }/>

          <Route path='/login' element={<Login/>}/>
          
          <Route path='/problemset' element={<ProblemSet/>}/>

          <Route path='/contest' element={<Contest/>}/>
          
          <Route path="*" element={<p>There's nothing here: 404!</p>} />

        </Routes>
      </Router>

      </UserContext.Provider>


    </div>
  );
}

export default App;
