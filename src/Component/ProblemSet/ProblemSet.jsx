import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import './ProblemSet.css'

const ProblemSet = () => {
    const [tag,setTag] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleChange = (event) => {        
        console.log(event.target.name, event.target.value)
        const newTag = { ...tag }
        newTag[event.target.name] = event.target.value;
        setTag(newTag)
  
    }
    const filterProblem = ()=>{
        console.log('fileter')
        console.log(tag);
    }
    return (
        <div>
            <NavBar></NavBar>
            <h1>Problems</h1>
            <div className='problem-container'>
                <div className='problem-filter'>

                    {/* <input className="filter-field" onChange={handleChange} name="filter" type="text" placeholder="Search Problem" required/> */}
                     <div className='problem-select'>
                            <label htmlFor="tag-select">Select Tag</label>
                            <br></br>
                            <select name="problems" id="tag-select" onChange={handleChange}>
                                <option value="numberTheory">Number Theory</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Trigonometry">Trigonometry</option>
                                <option value="Calculus">Calculus</option>
                            </select>

                     </div>
                    <input type="submit" value="Search" onClick={filterProblem} className="filterBtn" /> 
                    {loggedInUser?.MEMBER_TYPE !== "student" && <Link to='/addProblem'><input type="submit" value="Add Problem" onClick={filterProblem} className="filterBtn" /></Link> }
                </div>
                <div className='problem-show'>

                </div>
            </div>
            
        </div>
    );
};

export default ProblemSet;