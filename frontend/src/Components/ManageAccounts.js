import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useState } from 'react';
import Manage from './individuals/Manage';
import EmpNavBar from './EmpNavBar';
export default function ManageAccounts(props) {

  const [accounts,setAccounts]=useState([]);

  useEffect(()=>{
      const response= fetch("http://localhost:8080/getAll",{
      method:"get",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{console.log(response); return response.json();})
    .then((data)=>{console.log("manage"+data); setAccounts(data);})
    .catch((error)=>{console.log(error)})
  },[])

  return (
    <div>
      <EmpNavBar/>
      <>
      {
        accounts.map((data)=>{
          return(
            <div>
              <Manage accno={data}></Manage>
              </div>
          );  
            }
        )
    }
    </>
    </div>
  )
}
