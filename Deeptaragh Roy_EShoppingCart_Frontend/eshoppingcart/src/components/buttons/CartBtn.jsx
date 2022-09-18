import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AddCartAxios from "../AddCartAxios";


const CartBtn = () => {
  // We get a state of addItems
  const state1 = useSelector((state1) => state1.allItem);
  const [v,setv]= useState(0);


  const refresh=()=>{
    window.open("http://localhost:3000/cart","_self")
  }
  useEffect(()=>{
    try {
      
      setv(state1[state1.length-1].length);
      console.log("in tryyyyyyyyyyyyyy",v)
      
    } catch (error) {
      setv(0)
    }
  },[state1])
  return (
    <>
      <NavLink to="/cart" className="btn btn-outline-primary ms-2">
        <span  className="fa fa-shopping-cart me-1"> Cart({v})</span>
      </NavLink>
    </>
  );
};

export default CartBtn;
