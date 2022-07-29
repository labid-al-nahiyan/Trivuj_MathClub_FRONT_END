import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import './LogIn.css';

const LogIn = ({state,setState}) => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [aboutPassword,setAboutPassword]=useState('')
    const [passConfirmation,setPassConfirmation]=useState('')
    const [wrongUser,setWrongUser] = useState('')
    let navigate  = useNavigate();
    let location = useLocation();
    let [user,setUser] = useState();
    
    const handleChange = (event) => {

        let isFormValid = true;
        setWrongUser('')
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
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
            
        }
    }
    
    const LogInUser =async (event)=>{
        event.preventDefault();
        console.log(user);

        try {
            const res = await fetch('http://localhost:3010/member/verify', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            
            const data = await res.json()  
            
            
            
            if(data.length === 0){
                setWrongUser('Wrong Username or password')
            }
            else{
                setLoggedInUser(data[0]);
                console.log(data);
                window.localStorage.setItem("token",JSON.stringify(data[0]))
                setState(2)
                navigate(location?.state?.from || '/', {replace:true})
            }
   
        } catch (error) {
            console.log(error);
        }
    }

    return (
        
        <div>
            <div className="form-container">
                <div className="form">
                    <form>
                        <input className="input-field" onChange={handleChange} name="name" type="text" placeholder="User Name" required/>
                        <input className="input-field" type="password" onChange={handleChange} name="password" placeholder="Password"required />
                        <input className="enterBtn"  type="submit" value="Log in" onClick={LogInUser}  /> <br></br>
                    {/* {goForLogin && <input type="submit" value="Log In" onClick={LogInUser} className="orangeBtn" /> } */}
                        <small style={{color:'red'}}>{wrongUser}</small>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;