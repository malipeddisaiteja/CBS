import React, { useState } from 'react'
import EmpNavBar from './EmpNavBar'
import '../css/Interest.css'
export default function Interest() {
  const[val,setVal]=useState("");

  const calcInt =async()=>{
    const response= await fetch('http://localhost:8080/calcinterest',{
      method:"post",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=>{console.log(response); return response.json();})
    .then((data)=>{console.log(data); setVal(data);})
    .catch((error)=>{console.log(error)})
  }
  return (
    <div>
      <EmpNavBar></EmpNavBar>
      <button className='btn' onClick={calcInt}>Generate Quarterly Interest For all Accounts</button>
      <h4>{val}</h4>
    </div>
  )
}
