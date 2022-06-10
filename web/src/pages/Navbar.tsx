import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

const Navbar = () => {

  const user = useSelector(selectCurrentUser)
 

  const userName =  user? user:"Logo"
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            {userName}
          </Link>
          {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo02"> */}
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/Login"}>
                  Login
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>
                  Sign up
                </Link>
              </li> */}
             
              <li className="nav-item">
                <Link className="nav-link" to={"/product"}>
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/addproduct"}>
                  ProductForm
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to={"/cart"}>
               
                  <i className="fa fa-shopping-cart " ></i> 
                  <span className='badge badge-warning' id='lblCartCount'> 5 </span>

                </Link>
              </li> */}
            </ul>
            <Link className="nav-link" to={"/cart"}>
            <div className="navebar cartbadge">
                <i className="fa fa-shopping-cart " style={{fontSize:"24px"}} ></i>  
               <span id='lblCartCount' className="count count-warning"> 5 </span>
            </div>
                </Link>
          </div>
        {/* </div> */}
      </nav>
    </>
  );
};

export default Navbar;
