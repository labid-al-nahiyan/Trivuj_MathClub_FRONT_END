import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [goForLogin, setGoForLogin] = useState(false)
    const [aboutPassword,setAboutPassword]=useState('')
    const [passConfirmation,setPassConfirmation]=useState('')

    
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
        }
    }

    return (
        <div>
            <div className="form-container text-center">
                <div>
                    <div className="form text-center">
                        <form action="">

                            {!goForLogin && <input className="input-field" onChange={handleChange} name="name" type="text" placeholder="User Name" required/>}
                            <input className="input-field" type="email" onChange={handleChange} name="email" placeholder="User Email" required/>
                            <input className="input-field" type="password" onChange={handleChange} name="password" placeholder="Password"required />
                            <small style={{color:'red'}}>{aboutPassword}</small>
                            {!goForLogin && <input className="input-field" onChange={handleChange} name="confirmPass" type="password" placeholder="Confirm Passsword" required />}
                            {<small style={{color:'red'}}>{passConfirmation}</small>}
                            {!goForLogin && <input type="submit" value="Create Account" className="orangeBtn" /> } 
                            {goForLogin && <input type="submit" value="Log In" className="orangeBtn" /> }

                            {!goForLogin &&
                                <p>Already has an account?<button className="stateChangebtn" onClick={() => { setGoForLogin(true) }}>Log in</button> </p>
                            }
                            {goForLogin && <p>Don't have a account?<button className="stateChangebtn" onClick={() => { setGoForLogin(false) }}>Create account</button></p>}

                        </form>
                    </div>
                    <div className="google">
                        <button>Sign in with google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;