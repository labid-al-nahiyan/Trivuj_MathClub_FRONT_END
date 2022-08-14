import React from 'react';
import { Link } from 'react-router-dom';
import './Problem.css'

const Problem = ({problem}) => {


    return (
        <div>
            <Link to={'problem/' + problem.ID} className='prob-link' >
                <div className='prob-container'>
                    <div>
                        <h3>{problem.TITLE}</h3>
                    </div>
                    <div className='prob-tag'>
                        <div className='tag'>
                            <h6>{problem.TAG}</h6>
                        </div>
                        <div className='difficulty'>
                        <h6>{problem.DIFFICULTY}</h6>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Problem;