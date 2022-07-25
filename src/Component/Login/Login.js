import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [goForLogin, setGoForLogin] = useState(false)
    const [aboutPassword,setAboutPassword]=useState('')
    const [passConfirmation,setPassConfirmation]=useState('')
    const [userInfo, setUserInfo] = useState({});
    let navigate  = useNavigate();
    let {state} = useLocation();
    
    
    const handleChange = (event) => {

        let isFormValid = true;
        
        console.log(event.target.name, event.target.value)

        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            console.log(aboutPassword)
            const passwordHasNumber = /\d{1}/.test(event.target.value)
            const passwordInfo=!isPasswordValid?'*character must be more than 6':(!passwordHasNumber?'Must be a number(ex:1,2)':'');
            setAboutPassword(passwordInfo)
            isFormValid = isPasswordValid && passwordHasNumber
        }
        if (event.target.name === 'confirmPass') {
            const confirmPass=(event.target.value===loggedInUser['password'])?'':'password does not match'
            setPassConfirmation(confirmPass)
        }
        if (isFormValid) {
            const newUserInfo = { ...loggedInUser }
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo)
            setUserInfo(newUserInfo)
        }
    }

    const CreateUser = (event)=>{
        event.preventDefault();
        console.log(state);
        fetch('http://localhost:3010/member/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loggedInUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
            
        
    }
    const LogInUser = ()=>{
        console.log("login");
    }

    return (
        <div>
            <div className="form-container text-center">
                <div>
                    <div className="form text-center">
                        <form action="">

                            <input className="input-field" onChange={handleChange} name="name" type="text" placeholder="User Name" required/>
                            {!goForLogin && <input className="input-field" onChange={handleChange} name="firstName" type="text" placeholder="First Name" required/>}
                            {!goForLogin && <input className="input-field" onChange={handleChange} name="lastName" type="text" placeholder="Last Name" required/>}

                            <input className="input-field" type="password" onChange={handleChange} name="password" placeholder="Password"required />
                            <small style={{color:'red'}}>{aboutPassword}</small>
                            {!goForLogin && <input className="input-field" onChange={handleChange}  name="confirmPass" type="password" placeholder="Confirm Passsword" required />}
                            {<small style={{color:'red'}}>{passConfirmation}</small>}


                            {!goForLogin && <input type="submit" value="Create Account" onClick={CreateUser} className="orangeBtn" /> } 
                            {goForLogin && <input type="submit" value="Log In" onClick={LogInUser} className="orangeBtn" /> }


                            {!goForLogin &&<p>Already has an account?<button className="stateChangebtn" onClick={() => { setGoForLogin(true) }}>Log in</button> </p>}
                            {goForLogin && <p>Don't have a account?<button className="stateChangebtn" onClick={() => { setGoForLogin(false) }}>Create account</button></p>}

                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Login;