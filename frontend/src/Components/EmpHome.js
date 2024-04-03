import React from 'react'
import { NavLink } from 'react-router-dom';
import bank from '../css/bank.jpg'; 
import Empdashboard from './Empdashboard';

export default function EmpHome(props) {
  return (
    <div className='home'>
    
         {props.isEmpLoggedIn ? (
        <div>
          <Empdashboard empid={props.empid} />
        </div>
      ) : (
        <div>
        <div>
      <h1 className='welcome'>CBS Employee Portal</h1>
      <NavLink className='login' to='/emplogin'>Login</NavLink>
    </div>  
    <div>
        <NavLink className='login' to='/'>Login as Customer</NavLink>
    </div>
    </div>
      )}
      </div>
  )
}
