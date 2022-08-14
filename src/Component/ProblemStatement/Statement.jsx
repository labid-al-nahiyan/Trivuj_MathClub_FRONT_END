import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import './Statement.css'

const Statement = () => {
    
    const {id} = useParams()
    const [problem, setProblem] = useState({});
    const [string, setString ] = useState('');
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

    return (
        <div>
            <div className='statement-container'>
                <h3>{problem.TITLE} </h3>
                <hr />
                <div>
                    {parse(string)}
                </div>
            </div>
        </div>
    );
};

export default Statement;