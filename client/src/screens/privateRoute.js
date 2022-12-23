import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
 return(
  <Route
  {...rest}
  component={(props)=>{
    const token=window.localStorage.getItem("userInfo")
    if (token) {
      return <Component {...props}/>
      
    } else {
      return <Redirect to={"/login"}/>
      
    }
  }}/>
 )}

export default PrivateRoute;