import React from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./features/auth/RequireAuth";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import ProductList from "./pages/ProductList";
import SignUp from "./pages/Signup";

function App() {
  return (
    <>
      <Router>
        <div className="">
         <Navbar/>
          
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<RequireAuth />}>
          <Route path="product" element={<ProductList />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="cart" element={<Cart />} />
        </Route>
              </Routes>
            </div>
        
      </Router>
    </>
  );
}

export default App;
