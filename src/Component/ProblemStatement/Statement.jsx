import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './Statement.css'
import NavBar from '../NavBar/NavBar';
import { UserContext } from '../../App';

const Statement = () => {
    
    const {id} = useParams()
    const [problem, setProblem] = useState({});
    const [string, setString ] = useState('');
    const [submit,setSubmit] = useState({});
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [verdictStatus, setVerdictStatus] = useState('');
    const [ans,setAns] = useState('');
    const parse = require('html-react-parser')
    let navigate  = useNavigate();
    let location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
          
          const res = await fetch('http://localhost:3010/problemset/getStatement/'+id);
          const data = await res.json();
          setProblem(data[0]);
          setString(data[0].STATEMENT)
          
          //console.log(data);    
        }      
        fetchData()
        .catch(console.error);

        
        
    }, [])

    useEffect(()=>{
        postSubmit();
    },[submit])
    
    const handleChange = async (event) => {
        
     
        const newUserInfo = { ...submit }
        newUserInfo['PROBLEMID'] =  problem.ID
        newUserInfo['MEMBERID'] = loggedInUser.ID
        setSubmit(newUserInfo)

        if(event.target.name==='answer'){
            setAns(event.target.value);
        }

    }

    const postSubmit=()=>{
        console.log(submit)

        if(submit.hasOwnProperty('verdict') && submit.hasOwnProperty('PROBLEMID')){
            console.log("complete")
            try {
                fetch('http://localhost:3010/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submit)
                })
                .then((res)=>{
                    res.json()
                    console.log('hello');
                })
                .then(data=>{
                    console.log(data)
                    console.log('hello2')
                 //   navigate(location?.state?.from || '/', {replace:true})
                })
            } catch (error) {
                console.log(error);
            }
        }
        else{
            console.log('imcomplete')
            
        }
        
    }

    const handleSubmit=async(e)=>{
       

        const submittedAns = ans*1;
        const newUserInfo = { ...submit }
        newUserInfo['submittedAns'] = submittedAns;

        if(submittedAns===problem.ANSWER){
            console.log("Answer Match");
            newUserInfo['verdict'] = 'T';
            setVerdictStatus('Correct Answer')
        }
        else{
            console.log("Answer Dont match")
            newUserInfo['verdict'] = 'F';
            setVerdictStatus('Wrong Answer')
        }
        setSubmit(newUserInfo);
        
    
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
                <div  className='statement-ans'>
                    <input type="text" name='answer' placeholder='Enter Your Answer' onChange={handleChange} />
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
                    <div style={submit['verdict']==='F'?{color:'red'}:{color:'green'}}>
                        <p>{verdictStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statement;