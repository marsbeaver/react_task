import React, { useState } from 'react';
import { useRef } from 'react';
import {useNavigate} from "react-router-dom";


let flag=false;
let empty_flag=false;

function checkEmail(s){
  return String(s)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }
function checkValidity(o){
  flag=true;
    let k = Object.keys(o);
    k.forEach( e => {
      if(e==="emailId/number"){
        if(!checkEmail(o[e])){
          if((isNaN(o[e]))){
            flag=flag&&false;
          }
        }
      }else if(e==="password"){
        if(o[e].length<8){
          flag=flag&&false;
        }
      }
  });
  return flag;
}


const Login = () =>{

  const [inputs, setInputs] = useState({});
  const endpoint = "http://localhost:5000/login";
  const msg = useRef(null);
  const inp = useRef(null);
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const e = event.target;
    const name = e.name;
    const value = e.value;
    
    setInputs(values => ({...values,[name]: value}));
    if(e.value){  
      if(e.name==="emailId/number"){
        if(!checkEmail(e.value)){
          if((isNaN(e.value))){
            msg.current.innerHTML="Please enter a valid email or mobile number";            
          }
        }
      }else if(e.name==="password"&&e.value.length<8){
        msg.current.innerHTML="Password must be at least 8 characters";            
      }else{
        msg.current.innerHTML="";
      }
    }else{
      msg.current.innerHTML="";
    }
  }
  const handleSubmit = async (event)=>{
    event.preventDefault();
    const form = event.target;

    for (let i = 0; i < form.length; i++) {
      if(form[i].value===""){
        msg.current.innerHTML = "Please fill all fields";
        empty_flag=false;
        break;
      }
      empty_flag=true;
    }
    
    const data = Array.from(event.target.elements)
    .filter((input)=>input.name)
    .reduce((obj, input)=> Object.assign(obj,{[input.name]:input.value}),{});

    flag = checkValidity(data);

    if((flag&&empty_flag)===true){
      //Get the data from form
      console.log("Submitting");
      

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
      if(result.status===200){
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
                <input ref={inp} key={l[index]} type={t[index]} name={l[index]} value={inputs[l[index]]||""} onChange={handleChange}/>
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