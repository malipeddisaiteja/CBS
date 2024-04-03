import React from 'react'
import { useLocation } from 'react-router-dom/dist';
import { useState,useEffect } from 'react'
import '../css/TransactionHistory.css';
import EmpNavBar from './EmpNavBar';
export default function Monthlystatement() {

  const [accounts,setAccounts]=useState([]);

  useEffect(()=>{
      const response= fetch("http://localhost:8080/getAll",{
      method:"get",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{console.log(response); return response.json();})
    .then((data)=>{console.log("account list "+data); setAccounts(data);})
    .catch((error)=>{console.log(error)})
  },[])


  const [accno,setAccno]=useState();
  const [mn,setmn]=useState(1);
  const [transactions,setTransactions] = useState([]);
  const handlechange=(event)=>{
    setAccno(event.target.value);
  }
  console.log("http://localhost:8080/monthly/?month="+{mn}+"&accountno="+{accno});
  const getTransactions = async () => {
    try {
      console.log("mn value: ",typeof(mn))
      const response = await fetch(`http://localhost:8080/monthly?accountno=${accno}&month=${mn}`, {
        method: "Get",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // setTransactions([{ transactionStatus: "Error fetching transactions" }]);
    }
  }
  const submitMonth = ()=>{
    getTransactions();
  }

  console.log(accounts)
  return (
    <div >
      <EmpNavBar></EmpNavBar>
      <div className='ms'>
      <br></br>
      <table className='input-table'>
        <tbody>
          <tr>
            <td>
            < label for="accno">Account No. : </label>
            </td>
            <td>
              {/* <input type="number" className="accno" value={accno} onChange={handlechange} /> */}
              <select className='accno' value={accno} onChange={handlechange}>{
                accounts.map((data)=>
                  <option value={data}>
                    {data}
                </option>)
}
             </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="monthSelect">Month : </label>
            </td>
            <td>
              <select id="monthSelect" onChange={(e)=>{console.log(e.target.value);setmn(parseInt(e.target.value, 10))}}>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
              </select>                          
            </td>
          </tr> 
          <tr>
            <td>  
              <button onClick={submitMonth}>Submit</button>  
            </td>
          </tr>
        </tbody>
      </table>
      
      
      <br></br> <br></br>

      
      <div>
      {(transactions==null || transactions.length===0)?<p>No Transactions Found</p>:<p>Statement for account no: {accno}</p>}
      </div>
      
      {console.log(transactions)}
      {/* <p>{transactions.map((transaction)=>console.log(transaction))}</p> */}
      <table className='transaction-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Transaction Ref. No.</th>
          <th>Account No.</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Transaction Date</th>
          <th>From Account</th>
          <th>To Account</th>
          <th>Mode</th>
          <th>Status</th>
          <th>Interest</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            {/* Use Object.values() to get the values of each field in the transaction object */}
            {Object.values(transaction).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  )
}
