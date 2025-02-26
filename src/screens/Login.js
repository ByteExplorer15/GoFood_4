import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
export default function Login() {
  
  const [credentials, setcredentials] = useState({email:"",password:""})
   
    let navigate = useNavigate()

    const handleSubmit= async(e)=>{
      e.preventDefault();
      const response = await fetch("https://gofood1-qin5.onrender.com/api/loginuser",{         /*ye backend me hit karne ke liye,ex-> thunder client ki help se data daal rhe the database me*/ 
      method:'POST',
      headers:{
         'Content-Type':'application/json'
      },    
       body:JSON.stringify({email:credentials.email, password:credentials.password})

      })
       
      const json = await response.json()
      console.log(json);

      if(!json.success){
        alert("Enter valid credentials")
      }

      if(json.success){
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        // localStorage.removeItem("token"); // Remove the old token if it's there
        console.log(localStorage.getItem("authToken"));
        
        navigate("/"); // Navigate to home if login is successful
    }
    

    }
const onChange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
}
  
  return (
    <div>
       
       <div className='container'>
      <form onSubmit={handleSubmit}>
 

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"  name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/creatuser" className='m-3 btn btn-danger'>I'm a new user</Link>
  </form>
  </div>


    </div>
  )
}
