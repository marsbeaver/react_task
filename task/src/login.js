import React, { useState } from 'react';
import { useRef } from 'react';
import {Outlet, useNavigate} from "react-router-dom";


function checkEmail(s){
  return String(s)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const Login = () =>{

  const [inputs, setInputs] = useState({});
  const endpoint = "http://localhost:5000/login";
  const msg = useRef(null);
  const navigate = useNavigate();
  let flag=true;

  const handleChange = (event) => {
    const e = event.target;
    const name = e.name;
    const value = e.value;
    
    setInputs(values => ({...values,[name]: value}))
    
    if(e.value){  
      if(e.name==="emailId/number"){
        if(!checkEmail(e.value)){
          if(isNaN(e.value)){
            msg.current.innerHTML="Please enter a valid email or mobile number";            
          }
        }
      }else if(e.name==="password"&&e.value.length<8){
        msg.current.innerHTML="Password must be at least 8 characters long";
      }
      else{
        flag=false;
        msg.current.innerHTML="";
      }
    }else{
      msg.current.innerHTML="";
    }
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const form = event.target;

    for (let i = 0; i < event.target.length; i++) {
      if(form[i].value===""){
        msg.current.innerHTML = "Please fill all fields";
        flag=true;
        break;
      }
      flag=false;
    }

    if(flag==false){
      //Get the data from form
      console.log("Submitting");
      const data = Array.from(event.target.elements)
      .filter((input)=>input.name)
      .reduce((obj, input)=> Object.assign(obj,{[input.name]:input.value}),{});

      //check if email or number

      let key = "";
      if(checkEmail(Object.values(data)[0])){
        key="emailId";
      }else{
        key="mobile";
      }
      Object.defineProperty(data,key,Object.getOwnPropertyDescriptor(data,"emailId/number"));
      delete data["emailId/number"];
      
      //Send data to server
      
      let result = await fetch(endpoint,{
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type':'application/json'
        }
      });
      console.log(result.status);
      try{
        result.text().then((result)=>console.log(result));
      }catch(err){
        console.log(err);
      }
      console.log(result);
      if(result.status==200){
        navigate("/home");
      }else{
        alert("User not found");
      }
    }
  };
  const cols = {
    "emailId/number":"text",
    "password":"password"
  };
  var f = [];
  var t = Object.values(cols);
  var l = Object.keys(cols);
  for (let index = 0; index < l.length; index++) {
    f.push(<div key={index}>
                <label>{l[index]}</label>
                <input key={l[index]} type={t[index]} name={l[index]} value={inputs[l[index]]||""} onChange={handleChange}/>
            </div>
    )
  }
  
  return (<div>
    <h1>Login</h1>
    <form action="" onSubmit={handleSubmit}>
        {f}
        <input type="submit" value="Submit" />
    </form>
    <p ref={msg}></p>
  </div>
  )
}

export default Login;
