import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/navbar.css';
export default function Navbar(props) {
  return (
    
      <nav className='navbar'>
        <br></br>      
        <NavLink className='nl' to='/accounts'>  Account  </NavLink>
        <NavLink className='nl' to='/history'> Statement  </NavLink>
        <NavLink className='nl' to='*'> BillPay  </NavLink>
        <NavLink className='nl' to='*'> Loan  </NavLink>
        <NavLink className='nl' to='*'> Get Card  </NavLink>
        {/* <NavLink className='nl' to='/interest'>  Quarterly Interest </NavLink>     */}
      </nav>
    
  )
}
