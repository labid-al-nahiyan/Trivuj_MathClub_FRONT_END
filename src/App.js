import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
import Profile from './Component/Profile/Profile';
import Footer from './Component/Footer/Footer';
import './App.css'
import AddProblem from './Component/AddProblem/AddProblem';
import AddCampaign from './Component/AddCampaign/AddCampaign';
import Post from './Component/Post/Post';
import AddPost from './Component/AddPost/AddPost';
import LeaderBoard from './Component/LeaderBoard/LeaderBoard'
import Admin from './Component/Admin/Admin';
import AdminHome from './Component/Admin/AdminHome/AdminHome';
import Statement from './Component/ProblemStatement/Statement';

export   const UserContext=createContext();


function App() {

  const [loggedInUser, setLoggedInUser]=useState(JSON.parse(window.localStorage.getItem('token')));


  const [color, changeColor] = useState("white");
  // const [color, changeColor] = useState("#ffffff");

  document.body.style.backgroundColor = color;

  return (
    <div>
      
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>

      <Router>
        <Header></Header>

        <Routes>
          
          <Route path='/' element={<Home></Home>}/>

          <Route path='/admin' element={<Admin></Admin>}></Route>

          <Route path='/adminHome' element={<AdminHome></AdminHome>}/>

          <Route path='/login' element={<Register/>}/>
          
          <Route path='/problemset' element={<ProblemSet/>}/>          

          <Route path='/contest' element={<Contest/>}/>

          <Route path='/campaign' element={<Campaign/>}/>

          <Route path='/blog' element={<Blog></Blog>}/>
          
          <Route path='/library' element={<Library></Library>}/>

          <Route path='/addProblem' element={<AddProblem></AddProblem>}/>

          <Route path='/problemset/problem/:id' element={<Statement></Statement>}/>

          <Route path='/profile/:id' element={<Profile/>}></Route>

          <Route path='/addCampaign' element={<AddCampaign/>}></Route>

          <Route path='/post' element={<Post/>}></Route>

          <Route path='/addPost' element={<AddPost/>}></Route>

          <Route path='/leaderboard' element={<LeaderBoard></LeaderBoard>}></Route>

          <Route path="*" element={<p>There's nothing here: 404!</p>} />    

        </Routes>

        <Footer></Footer>

      </Router>

      </UserContext.Provider>


    </div>
  );
}

export default App;
