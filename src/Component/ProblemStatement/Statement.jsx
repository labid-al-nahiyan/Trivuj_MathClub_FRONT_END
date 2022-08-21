import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './Statement.css'
import NavBar from '../NavBar/NavBar';

const Statement = () => {
    
    const {id} = useParams()
    const [problem, setProblem] = useState({});
    const [string, setString ] = useState('');
    const [submit,setSubmit] = useState({});
    const [ans,setAns] = useState(0);
    const parse = require('html-react-parser')

    useEffect(() => {
        const fetchData = async () => {
          
          const res = await fetch('http://localhost:3010/problemset/getStatement/'+id);
          const data = await res.json();
          setProblem(data[0]);
          setString(data[0].STATEMENT)
          console.log(string)
          
          
        }      
        fetchData()
        .catch(console.error);

        

    }, [])
    
    const handleChange = async (event) => {
        
        console.log(event.target.name, event.target.value)

        console.log(ans);
        console.log(problem.ANSWER);

        if(event.target.name==='answer'){
           await setAns(event.target.value);
        }
  
    }


    const handleSubmit=(e)=>{
        console.log(typeof(ans));
        console.log(typeof(problem.ANSWER));
        if(ans==problem.ANSWER){
            console.log("Answer Match");
        }
        else{
            console.log("Answer Dont match")
        }
    }
    return (
        <div>
            <NavBar></NavBar>
            <div className='statement-container'>
                <div className='statement-que'>
                    <h3>{problem.TITLE} </h3>
                    <hr />
                    <div>
                        {parse(string)}
                    </div>
                </div>
                <div >
                    <input type="text" name='answer' placeholder='Enter Your Answer' onChange={handleChange} />
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default Statement;