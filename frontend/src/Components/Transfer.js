import React from 'react'
import { useState } from 'react';
export default function Transfer() {
    const [res,setRes]=useState("");
    const[rec,setRec]=useState();
    const[sender,setSender]=useState();
    const[amt,setAmt]=useState();


    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response =await fetch('http://localhost:8080/transfer',{
          method:"post",
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            sender_accountno:sender,
            receiver_accountno:rec,
            amount:amt
          })
        }).then((response)=>{console.log(response); return response.json();})
        .then((data)=>{console.log(data); setRes(data);})
        .catch((error)=>{console.log(error)})
      }
  return (
    <div>
       <form className='transfer' onSubmit={handleSubmit}>
        <br></br><br></br>
        <h1>Send money to another account</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <label for="send">Enter Your Account Number </label>
              </td>
              <td>
                <input type='number' id="send" className='send' value={sender} onChange={(e)=>{setSender(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
                <label for="rec">Enter Reciever Account Number </label>
              </td>
              <td>
                <input type='number' id="rec" className='rec' value={rec} onChange={(e)=>{setRec(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
                <label for="amt">Enter amount </label>
              </td>
              <td>
                <input type='number' id="amt" className='amt' value={amt} onChange={(e)=>{setAmt(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit'>Initiate Transaction</button>
              </td>              
            </tr>
          </tbody>
        </table>
        
        <br></br>
      <br></br>
        <br></br>
        
      </form>
      <p>{res}</p>
    </div>
  )
}
