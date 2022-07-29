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

import ProblemSet from './Component/ProblemSet/ProblemSet';
import { createContext, useState } from 'react';
import Contest from './Component/Contest/Contest';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Register from './Component/Register/Register';
import Campaign from './Component/Campaign/Campaign';
import Blog from './Component/Blog/Blog';
import Library from './Component/Library/Library';
export   const UserContext=createContext();

function App() {

  const [loggedInUser, setLoggedInUser]=useState(JSON.parse(window.localStorage.getItem('token')));
  

  return (
    <div>
      
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

      <Router>
        <Header></Header>

        <Routes>
          <Route path='/' element={
              <Home></Home>
          }/>

          <Route path='/login' element={<Register/>}/>
          
          <Route path='/problemset' element={<ProblemSet/>}/>          

          <Route path='/contest' element={<Contest/>}/>

          <Route path='/campaign' element={<Campaign/>}/>

          <Route path='/blog' element={<Blog></Blog>}/>
          
          <Route path='/library' element={<Library></Library>}/>

          <Route path="*" element={<p>There's nothing here: 404!</p>} />    

        </Routes>
      </Router>

      </UserContext.Provider>


    </div>
  );
}

export default App;
