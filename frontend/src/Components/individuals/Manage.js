import React, { useState } from 'react'
import '../../css/manage.css'
import DeporWdraw from '../DeporWdraw';
export default function Manage({accno}) {

    const [res,setRes]=useState("");
    const closeAcc=async()=>{
        const response =await fetch('http://localhost:8080/close',{
            method:"delete",
            headers: {
                'Content-Type': 'application/json'
            },
            body:accno
        }).then((response)=>{return response.json()}).then((data)=>{console.log(data);setRes(data)}).catch((error)=>console.log(error))
    }

    
  return (
    <>
   
    <div className='managecard'>
        <h3>Account Number - {accno}</h3>
        <label> Reason For Closure : 
            <input type='text'/>
        </label>
        <br></br>
        <p></p>
        <button onClick={closeAcc}>Close Account</button>
        {/* <button onClick={transact}>Deposit Money</button>
        <button onClick={transact}>Withdraw Money</button> */}
        <h1>{res}</h1>
    </div>
    </>
  )
}
