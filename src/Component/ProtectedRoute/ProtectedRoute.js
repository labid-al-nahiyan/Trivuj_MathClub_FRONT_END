import React, { createContext, useContext } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


const ProtectedRoute=({ children, ...rest })=> {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    
      if(!loggedInUser.NAME){
          return navigate(
              '/',{
              state: { from: location }
            })
      }
      else{
          return children? children : <Outlet/>
      }
    
    
  }
export default ProtectedRoute;