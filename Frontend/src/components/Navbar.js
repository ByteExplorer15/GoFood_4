import {Link,useNavigate} from 'react-router-dom'
import React,{useState} from 'react'
// import Badge from "@material-ui/core/Badge";
import Badge from '@mui/material/Badge';          // added by me 
import Modal from '../Modal';
import Cart from '../screens/Cart';

import MailIcon from '@mui/icons-material/Mail';  // added by me 
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();

  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }


  return (
    <div>
        
   <nav className ="navbar navbar-expand-lg navbar-dark  bg-success">
   <div className="container-fluid">
  <Link className ="navbar-brand fs-1 fst-italic " to ="/"> GoFood </Link>
  <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavaltMarkup" aria-controls="navbarNavaltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className ="navbar-toggler-icon"></span>
  </button>


<div className="collapse navbar-collapse" id="navbarNavaltMarkup">
  <div className="navbar-nav w-100">
    {/* Home Link on the Left */}
    <Link className="nav-item nav-link active fs-5" to="/">Home<span className="sr-only"></span></Link>

    {/* Conditionally render 'My Orders' if authToken is present */}
    { 
      
      (localStorage.getItem("authToken")) ? 
        <Link className="nav-item nav-link active fs-5" to="/myOrder">My Orders<span className="sr-only"></span></Link>
      : ""
    }
    
    {/* Login and SignUp on the Right */}

     {(!localStorage.getItem("authToken")) ? 

    <div className='d-flex ms-auto'>
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
      <Link className="btn bg-white text-success mx-1" to="/creatuser">SignUp</Link>
    </div>
    :
     <div className='d-flex ms-auto'>
      <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
      My cart {" "}
      {/* <Badge pill bg="danger"> 2 </Badge> */}
      <Badge badgeContent={data.length} color="error">             {/*badge added by me*/}
      <MailIcon />
      </Badge>
      </div>
      
      {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : null}

     <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
      logout
     </div>
     </div>

     }
  </div>
</div>





  </div>
</nav>

    </div>
  )
}
