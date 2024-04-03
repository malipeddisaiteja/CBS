import React from 'react'
import TransactionHistory from './individuals/TransactionHistory';
import { useState,useEffect } from 'react';
import Navbar from './Navbar';
export default function UserStatement(props) {
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
    <div>
      <Navbar></Navbar>
    <>
      {
        accounts.map((data)=>{
          return(
            <div>
              <TransactionHistory accno={data}></TransactionHistory>
              </div>
          );  
            }
        )
    }
    </>
    </div>
  )
}
