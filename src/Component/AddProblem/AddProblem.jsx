import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './AddProblem.css'

const AddProblem = () => {


    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [addProblem,setAddProblem] = useState([]);
    let navigate  = useNavigate();
    let location = useLocation();

    const handleChange = (event)=>{

        console.log(event.target.name , event.target.value);
        const newAdd = { ...addProblem }
            newAdd[event.target.name] = event.target.value;
            setAddProblem(newAdd)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const newAdd = { ...addProblem }
        newAdd['organizerID'] = loggedInUser?.ID;
        setAddProblem(newAdd)

        console.log(addProblem);  
        
        
        try {
            fetch('http://localhost:3010/problemset/addProblem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addProblem)
            })
            .then((res)=>{
                res.json()
                console.log('hello');
            })
            .then(data=>{
                console.log(data)
                console.log('hello2')
             //   navigate(location?.state?.from || '/problemset', {replace:true})
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className='addProblem-container'>
                <div>

                </div>
                <div className='addProblem-form'>
                    <div>
                        <h1>Create a Problem </h1>
                    </div>

                    <div className='form'>
                        
                        <form action="" className='addProblem-form'>
                            <input type="text" name="title" id="title" onChange={handleChange}  placeholder='Enter Title'/>
                            
                            <textarea name="description" id="area" cols="100" rows="5" placeholder='Describe Your problem in details' onChange={handleChange}></textarea>
                            
                            <label htmlFor='img'>Select image for problem</label>
                            <input type="file" name="image" id="img"  onChange={handleChange}  placeholder="Choose Image "/>
                            
                            <input type="submit" value="Submit" className='problemBtn' onClick={handleSubmit} />
                        </form>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default AddProblem;