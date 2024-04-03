import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export default function Emplogin({onEmpLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();
    const [valid,setvalid] = useState(null);
    useEffect(()=>{
      routeLogin();
    },[valid]);

    const handleSubmit = async(e) => {
      e.preventDefault();
      const response=await fetch('http://localhost:8080/emplogin',{
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          empid:username,
          password:password
        })
      });
      console.log(username+" login")
      const val = await response.json().then((data)=> {return data});
      setvalid(val)
      console.log("valid: ",valid)
      console.log(val)
    };

    const routeLogin = ()=>{
      console.log("inside valid: ",valid)
      if(valid){
        onEmpLogin(username);
        navigate("/emp");
        
      }
      else{
        if(valid!=null){
          setError("Invalid Credentials")
        }
      }
    };
  
    return (
      <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Employee ID: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password: </label>
            <input
            className='password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
}
