import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/newac.css';
import Navbar from './Navbar';
import EmpNavBar from './EmpNavBar';

export default function NewAC() {
    const [formData, setFormData] = useState({
        custid: '',
        ifsccode: '',
        branch: '',
        type: 'savings',
        balance: '',
        nominee1: '',
        nominee2: '',
        upiid: '',
        category: ''
      });
      
      const [accno,setAccno]=useState(null);
      const navigate=useNavigate();

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        const response=await fetch('http://localhost:8080/openAC',{
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            custid: formData.custid,
            ifsccode: formData.ifsccode,
            branch: formData.branch,
            type: formData.type,
            balance: formData.balance,
            nominee1: formData.nominee1,
            nominee2: formData.nominee2,
            upiid: formData.upiid,
            category: formData.category
        })        
        }).then((response)=>{console.log(response); return response.json();})
        .then((data)=>{console.log(data); setAccno(data);})
        .catch((error)=>{setAccno("Error creating account")});
      };
    
      return (
        <div>
          <EmpNavBar/>
          {accno==null?(

        <form className='acform' onSubmit={handleSubmit}>
          
          <label htmlFor="custid">Customer ID:</label>
          <input type="text" id="custid" name="custid" value={formData.custid} onChange={handleChange} /><br />
    
          <label htmlFor="ifsccode">IFSC Code:</label>
          <input type="text" id="ifsccode" name="ifsccode" value={formData.ifsccode} onChange={handleChange} /><br />
    
          <label htmlFor="branch">Branch:</label>
          <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleChange} /><br />
    
          <label htmlFor="type">Account Type:</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
          </select><br />
    
          <label htmlFor="balance">Balance:</label>
          <input type="text" id="balance" name="balance" value={formData.balance} onChange={handleChange} /><br />
    
          <label htmlFor="nominee1">Nominee 1:</label>
          <input type="text" id="nominee1" name="nominee1" value={formData.nominee1} onChange={handleChange} /><br />
    
          <label htmlFor="nominee2">Nominee 2:</label>
          <input type="text" id="nominee2" name="nominee2" value={formData.nominee2} onChange={handleChange} /><br />
    
          <label htmlFor="upiid">UPI ID:</label>
          <input type="text" id="upiid" name="upiid" value={formData.upiid} onChange={handleChange} /><br />
    
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} /><br />
    
          <input type="submit" value="Submit" />
        </form>):
        (
          <div>
            <h2>{accno}</h2>
          </div>
        )
}
        </div>
      );
}
