import React, { useState } from 'react'

export default function Deposit() {

    const[acc,setAcc]=useState();
    const[amt,setAmt]=useState();
    const[res,setRes]=useState('');
    const generate=async()=>{
        const response =await fetch('http://localhost:8080/deposit',{
            method:"post",
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              accno:acc,
              amt:amt
            })
          }).then((response)=>{console.log(response); return response.json();})
          .then((data)=>{console.log(data); setRes(data);})
          .catch((error)=>{console.log(error)})
        }
  return (
    <div>
        <h3>Deposit Money</h3>
        <table>
          <tbody>
            <tr>
              <td>
              <label >Account No. </label>
              </td>
              <td>
              <input type="number" value={acc} onChange={(e)=>{setAcc(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
              <label>Amount</label>
              </td>
              <td>
              <input type='number' value={amt} onChange={(e)=>{setAmt(e.target.value)}}></input>
              </td>
            </tr>
            <tr>
              <td>
              <button onClick={generate}>Deposit</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <br></br>      
      <p>{res}</p>
    </div>
  )
}
