import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';

const AdminLogin = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [aboutPassword,setAboutPassword]=useState('')
    const [passConfirmation,setPassConfirmation]=useState('')
    const [wrongUser,setWrongUser] = useState('')
    let navigate  = useNavigate();
    let location = useLocation();
    
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
            const newUserInfo = { ...loggedInUser }
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo)
            
        }
    }
    
    const LogInAdmin =async (event)=>{
        event.preventDefault();
        console.log(loggedInUser);

        try {
            const res = await fetch('http://localhost:3010/admin/verify', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loggedInUser)
            })
            
            const data = await res.json()  
            
            console.log(data)
            if(data.length === 0){
                setWrongUser('Wrong Username or password')
            }
            else{
                setLoggedInUser(data[0]);
                console.log(data);
                window.localStorage.setItem("admintoken",JSON.stringify(data[0]))
                navigate('/adminHome', {replace:true})
            }
   
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className="form-login-container">
                <div className="form-login" style={{border:'0'}}>
                    <form>
                        <input className="login-input-field" onChange={handleChange} name="name" type="text" placeholder="User Name" required/>
                        <input className="login-input-field" type="password" onChange={handleChange} name="password" placeholder="Password" required />
                        <small style={{color:'red'}}>{wrongUser}</small>
                        <input className="enterBtn"  type="submit" value="Log in" onClick={LogInAdmin}  /> <br></br>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;