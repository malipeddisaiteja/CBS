import './App.css';
import { Routes,Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './Components/Home';
import UserRegister from './Components/UserRegister';
import UserLogin from './Components/UserLogin';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import Empdashboard from './Components/Empdashboard';
import Emplogin from './Components/Emplogin';
import Interest from './Components/Interest';
import ManageAccounts from './Components/ManageAccounts';
import Monthlystatement from './Components/Monthlystatement';
import NewAC from './Components/NewAC';
import TransactionHistory from './Components/individuals/TransactionHistory';
import EmpRegister from './Components/EmpRegister';
import NoMatch from './Components/NoMatch';
import EmpHome from './Components/EmpHome';
import Accounts from './Components/Accounts';
import UserStatement from './Components/UserStatement';
import DeporWdraw from './Components/DeporWdraw';
function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [custid, setCustid] = useState("")
  const navigate=useNavigate();
  const handleLogin = (customerId) => {
    console.log(customerId+"app")
    setCustid(customerId);
    setLoggedIn(true);
    navigate("/");
  };

  const handleLogout=()=>{
    setLoggedIn(false);
    setCustid(null);
  }

  // Emp login code
  const [isEmpLoggedIn, setEmpLoggedIn] = useState(false)
  const [empid, setEmpid] = useState("")

  const handleEmpLogin = (empid) => {
    console.log(empid+" app")
    setEmpid(empid);
    setEmpLoggedIn(true);
    navigate("/emp");
  };

  const logout=()=>{
    setCustid(null);
    setLoggedIn(false);
    navigate("/")
  }

  const handleEmpLogout=()=>{
    setEmpLoggedIn(false);
    setEmpid(null);
    navigate("/emp");
  }
  return (
    <div className="App">
      <div className='header'>
        <NavLink className='headerl' to="/">Core Banking System</NavLink>
        {/* {isEmpLoggedIn==false && <NavLink className='loginemp' to='/emp'>Login as Employee</NavLink>} */}
        {loggedIn==true && <button className="logout" onClick={logout}>Logout <br></br>{custid}</button>}
        {isEmpLoggedIn==true && <button className="logout" onClick={handleEmpLogout}>Logout <br></br>{empid}</button>}
    </div>
      <Routes>
        
        {/* User */}
        <Route path="/" element={<Home loggedIn={loggedIn} custid={custid}></Home>}/>
        <Route path="/Register" element={<UserRegister/>}/>
        <Route path="/UserLogin" element={<UserLogin onLogin={handleLogin}/>}/>
        <Route path='/accounts' element={<Accounts custid={custid}/>}/>
        <Route path='/history' element={<UserStatement custid={custid}/>}/>     
        <Route path='/transfers' element={<DeporWdraw></DeporWdraw>}/>

        <Route path='/empregister' element={<EmpRegister onEmpLogin = {handleEmpLogin}/>}/> 
        <Route path='/emplogin' element={<Emplogin onEmpLogin = {handleEmpLogin}/>}/>
        <Route path='/emp' element={<EmpHome isEmpLoggedIn={isEmpLoggedIn} empid = {empid}/>}/>
        <Route path='/openAC' element={<NewAC/>}/>
        <Route path='/editAcc' element={<ManageAccounts/>}/>
        <Route path='/statement' element={<Monthlystatement/>}/>
        <Route path='/interest' element={<Interest/>}/>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
