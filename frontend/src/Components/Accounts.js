import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Account from './individuals/Account';
import Navbar from './Navbar';

export default function Accounts(props) {
    const[accounts,setAccounts]=useState([]);
    useEffect(()=>{
      console.log(props.custid);
      const response= fetch("http://localhost:8080/getAccount",{
        method:"post",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          custid:props.custid
        })
      })
      .then((response)=>{console.log(response); return response.json();})
      .then((data)=>{console.log(data); setAccounts(data);})
      .catch((error)=>{console.log(error)})
    },[]);
    
  return (

    <>
    <Navbar></Navbar>
      {
        
        accounts.map((data)=>{
          return(
            <div>
              <Account accno={data}></Account>
              </div>
          );  
            }
        )
    }
    </>
  );
}
