import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function EmpRegister({handleEmpLogin}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        empid: '',
        password: '',
        firstname: '',
        middlename: '',
        lastname: '',
        mobileno: '',
        emailid: '',
        dob: ''
      });

      const handleChange = (e, field) => {
        const { value } = e.target;
        setFormData({ ...formData, [field]: value });
      };

      const[val,setVal]=useState("");

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
       const response = await fetch('http://localhost:8080/empregister', {
        method: "post",
        // credentials: "include",
        headers: {
            // needed so express parser says OK to read
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            empid: formData.empid,
            password: formData.password,
            firstname: formData.firstname,
            middlename: formData.middlename,
            lastname: formData.lastname,
            mobileno: formData.mobileno,
            emailid: formData.emailid,
            dob: formData.dob
        })
        })
        .then(function(response){
        console.log(response)
        return response.json()
        }).then(function(data){
        setVal(data);
        console.log(data)
        })
        if (response.status !== 200) {
          return alert("Something went wrong");
        }
        console.log(response.body);
        handleEmpLogin(formData.empid);
        navigate("/emplogin");   
      };
  return (
    <div className='form-container'>
      <h1>Welcome</h1>
      <br></br>
      <h3>Register as a customer</h3>
      <br></br>
      <p>Fill in your details</p>
      <form onSubmit={handleSubmit}>
      <label>
        Emp ID:
        <input
          type="text"
          value={formData.empid}
          onChange={(e) => handleChange(e, 'empid')}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={formData.password}
          onChange={(e) => handleChange(e, 'password')}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={formData.firstname}
          onChange={(e) => handleChange(e, 'firstname')}
        />
      </label>
      <label>
        Middle Name:
        <input
          type="text"
          value={formData.middlename}
          onChange={(e) => handleChange(e, 'middlename')}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={formData.lastname}
          onChange={(e) => handleChange(e, 'lastname')}
        />
      </label>
      <label>
        Mobile No:
        <input
          type="text"
          value={formData.mobileno}
          onChange={(e) => handleChange(e, 'mobileno')}
        />
      </label>
      <label>
        Email ID:
        <input
          type="email"
          value={formData.emailid}
          onChange={(e) => handleChange(e, 'emailid')}
        />
      </label>
      <label>
        DOB:
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => handleChange(e, 'dob')}
        />
      </label>
      <button >Submit</button>
    </form> 
    </div>
  )
}
