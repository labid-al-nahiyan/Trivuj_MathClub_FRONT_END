import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Submission.css';

const Submission = () => {

    const [submissions,setSubmission] = useState([])
    const [verdictStatus,setVerdictStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch('http://localhost:3010/submission');
          const data = await res.json();

          setSubmission(data);
          console.log(data);
        
          return data;
        }

        fetchData()
          .catch(console.error);
      
    }, [])

    
    return (
        <div>
            <NavBar></NavBar>
            <h1>Submission</h1>
             
            <div>
                <table>
                    <tr>
                        <td>Submission Id</td>
                        <td>Name</td>
                        <td>Problem Title</td>
                        <td>Verdict</td>
                        <td>Time</td>
                    </tr>
                    
                    <tr></tr>
                    {
                        submissions.map((submission)=>{
                            
                            return <tr>
                                <td>
                                    {submission.SID}
                                </td>
                                <td>
                                    {submission.NAME}
                                </td>
                                <td>
                                    <Link to={'../problemset/problem/' + submission.PID} className='prob-link' >{submission.TITLE}</Link>     
                                </td>
                                <td>
                                    {submission.VERDICT==='T'?'CORRECT ANSWER':'WRONG ANSWER'}
                                </td>
                                <td>
                                    {submission.TIME}
                                </td>
                            </tr>
                        })
                    }
                </table>
            </div>
            
        </div>
    );
};

export default Submission;