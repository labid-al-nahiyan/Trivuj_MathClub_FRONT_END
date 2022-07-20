import React, { useState } from 'react';
import { useEffect } from 'react';

const ProblemSet = () => {
    const [names,setNames] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3010/about/avro/labid')
        .then(res=>res.json())
        .then(data=>{

            setNames(data)
            
        })
    },[])


    return (
        <div>
            <h1>ProblemSET</h1>
            <div>
               {
                names.map((name)=>{
                    return <div style={{border:`1px solid black`,padding:`5px`,margin:`3px`}}>
                                {console.log(name)};
                                <h2> NAME: {name.FIRST_NAME} {name.LAST_NAME}</h2>
                                <h3> Mobile No : {name.PHONE_NUMBER}</h3>
                            </div>
                })
               }
            </div>
            
        </div>
    );
};

export default ProblemSet;