import React, { useContext, useState } from 'react';
import './AddTrainer.css'

import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';


const AddTrainer = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [trainer,setTrainer] = useState({});
    let navigate  = useNavigate();
    let location = useLocation();
    
    
    const handleChange = (event) => {

        let isFormValid = true;
        
        console.log(event.target.name, event.target.value)

        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)

        }
        
        if (isFormValid) {
            const newUserInfo = { ...trainer }
            newUserInfo[event.target.name] = event.target.value;
            setTrainer(newUserInfo)
        }
    }

    const AddTrainer = (event)=>{
        event.preventDefault();
        console.log(trainer);
        try {
            fetch('http://localhost:3010/admin/trainer/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainer)
            })
            .then((res)=>{
                res.json()
                console.log('hello');
            })
            .then(data=>{
                console.log(data)
                console.log('hello2')
                navigate(location?.state?.from || '/adminHome', {replace:true})
            })
        } catch (error) {
            console.log(error);
        }
            
        
    }
    

    return (
        <div>
            <div className="trainer-container text-center">  
                    <div className="trainer-form text-center">
                        <form action="" className='addTrainer-form'>

                                <label htmlFor="name">Full Name</label>
                                <input className="trainer-input-field" id='name' onChange={handleChange} name="Name" type="text" placeholder="Enter Full Name" required/>
                            
                                <label htmlFor="email">Enter email:</label>
                                <input className="trainer-input-field" id='email' onChange={handleChange} name="email" type="email" placeholder="Enter your Email" required/>
                            
                                <label htmlFor="dob">Date of Birth:</label>
                                <input type="date" name="DOB" id='dob' onChange={handleChange} className='trainer-input-field' placeholder='Enter your birthdate' />
                            
                                <label htmlFor="institution">Institution:</label>
                                <input type="text" id='institution' name="Institution" onChange={handleChange} className='trainer-input-field' placeholder='Enter your Institution' />

                                <label htmlFor='expertize-select'>Select Expertise :</label>
                                <select name="expert" id="expertize-select" className='trainer-input-field' onChange={handleChange} required>
                                    <option value="" selected disabled>Select One </option>
                                    <option value="Number Theory">Number Theory</option>
                                    <option value="Calculus">Calculus</option>
                                </select>
                            
                                <input type="submit" value="Add Trainer" onClick={AddTrainer} className="createBtn" /> 
       
                        </form>
                    </div> 

                    
            </div>
            
        </div>
    );
};



export default AddTrainer;