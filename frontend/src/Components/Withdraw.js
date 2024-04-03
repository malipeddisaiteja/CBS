import React, { useState } from 'react'
export default function Withdraw() {
    const[acc,setAcc]=useState();
    const[amt,setAmt]=useState();
    const[res,setRes]=useState('');
    const generate=async()=>{
        const response =await fetch('http://localhost:8080/withdraw',{
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
        <h3>Withdraw money</h3>
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
              <button onClick={generate}>Withdraw</button>
              </td>
            </tr>
          </tbody>
        </table>
      <p>{res}</p>
    </div>
  )
}
