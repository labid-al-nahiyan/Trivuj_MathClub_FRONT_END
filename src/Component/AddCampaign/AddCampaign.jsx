import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Home/TopComp/Nav/Nav';
import NavBar from '../NavBar/NavBar';
import './AddCampaign.css'

const AddCampaign = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [addCamp,setAddCamp] = useState([]);
    let navigate  = useNavigate();
    let location = useLocation();

    const handleChange = (event)=>{

        console.log(event.target.name , event.target.value);
        const newAdd = { ...addCamp }
            newAdd[event.target.name] = event.target.value;
            setAddCamp(newAdd)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const newAdd = { ...addCamp }
        newAdd['organizerID'] = loggedInUser?.ID;
        setAddCamp(newAdd)

        console.log(addCamp);
        try {
            fetch('http://localhost:3010/campaign/addCampign', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addCamp)
            })
            .then((res)=>{
                res.json()
                console.log('hello');
            })
            .then(data=>{
                console.log(data)
                console.log('hello2')
                navigate(location?.state?.from || '/campaign', {replace:true})
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    return (
        <div>
            <NavBar></NavBar>
            <div className='addCampaign-container'>
                <div>

                </div>
                <div className='addCampaign-form'>
                    <div>
                        <h1>Organize a Campaign</h1>
                    </div>

                    <div className='form'>
                        
                        <form action="" className='addCamp-form'>
                            <input type="text" name="title" id="title" onChange={handleChange}  placeholder='Enter Title'/>
                            <div className='camp-duration'>
                                <input type="text" name="startDate" id="date" placeholder="MM/DD/YYYY" onChange={handleChange}
                                        onFocus={(e)=>{e.currentTarget.type="date"}}/>
                                <input type="text" name = "endDate" id="date" placeholder="MM/DD/YYYY"  onChange={handleChange}
                                        onFocus={(e)=>{e.currentTarget.type="date"}}/>
                                    
                            </div>
                            <textarea name="address" id="area" cols="30" rows="2" placeholder='Campaign place' onChange={handleChange}></textarea>
                            <textarea name="description" id="area" cols="100" rows="5" placeholder='Describe Your Campaign in details' onChange={handleChange}></textarea>

                            <input type="submit" value="Submit" className='campBtn' onClick={handleSubmit} />
                        </form>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default AddCampaign;