import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css'
import AddProblem from '../../AddProblem/AddProblem';
import AddCampaign from '../../AddCampaign/AddCampaign';
import AddTrainer from '../../AddTrainer/AddTrainer';


const AdminHome = () => {

    const [stage,setStage] = useState(0);

    return (
        <div>
            <h1>AdminHome</h1>
            <br />
            <div className='adminHome-container'>
                <div className='adminHome-nav'>
                    <input type="submit" value="Add Problem" onClick={()=>{setStage(1);console.log(stage)}} className="AdminBtn" />
                    <input type="submit" value="Add Campaign" onClick={()=>{setStage(2);console.log(stage)}} className='AdminBtn'/>
                    <input type="submit" value="Add Trainer" onClick={()=>{setStage(3);console.log(stage)}} className='AdminBtn'/>

                </div>
                <div>
                    
                    {stage===1 && <AddProblem></AddProblem>}
                    {stage===2 && <AddCampaign></AddCampaign>}
                    {stage===3 && <AddTrainer></AddTrainer>}

                </div>
            </div>
        </div>
    );
};

export default AdminHome;