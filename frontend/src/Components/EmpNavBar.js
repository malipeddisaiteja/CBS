import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/navbar.css';
export default function EmpNavBar() {
  return (
    <nav className='navbar'>
        <br></br>
        <NavLink className='nl' to='/openAC'> Create Account    </NavLink>
        <NavLink className='nl'  to='/editAcc'>  Edit Account  </NavLink>
        <NavLink className='nl' to='/transfers'> Transfers  </NavLink>
        <NavLink className='nl'  to='/statement'>  Statements  </NavLink>
        <NavLink className='nl'  to='/interest'> Interest </NavLink>  
      </nav>
  )
}
