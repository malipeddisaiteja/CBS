import React from 'react'
import { useState } from 'react';
import EmpNavbar from './EmpNavBar';
import Transfer from './Transfer';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

export default function DeporWdraw() {
    const [res,setRes]=useState("");
    const[opt,setOpt]=useState("t");
    
  return (
    <div>
      <EmpNavbar />
      <form className='option'>
        <h5>Select Type of Transaction</h5>
        <select value={opt} onChange={(e)=>{console.log(e.target.value);setOpt(e.target.value)}}>
          <option value="t">Transfer</option>
          <option value="d">Deposit</option>
          <option value="w">Withdraw</option>
        </select>
      </form>
    
        {(opt=="t") && 
         <Transfer></Transfer>
        }
        {(opt=="d")&&
        <Deposit></Deposit>
        }
        {
          (opt=="w")&&
          <Withdraw></Withdraw>
        }
        
      <p>{res}</p>
    </div>
  )
}
