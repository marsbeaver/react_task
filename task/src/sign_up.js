
//import packages

import React, { useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import './style.css';

// Flags for validation

let flag=false;
let empty_flag = false;

// Check if email format is valid

function checkEmail(s){
  return String(s)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

// Check if given data is valid

function checkValidity(o){
  let flag = true;
  let k = Object.keys(o);
  k.forEach( e => {
    if(["firstName","lastName"].includes(e)&&/\d/.test(o[e])){
      flag = flag&&false;
    }else if(e==="emailId"&&!checkEmail(o[e])){
      flag = flag&&false;
    }else if(e==="mobile"&&(isNaN(o[e])||o[e].length!==10)){
      flag = flag&&false;
    }else if(e==="password"&&o[e].length<8){
      flag = flag&&false;
    } 
  });
  return flag;
}

// Functional component

const SignUp = () =>{

  // Hook to create variable that stores given input

  const [inputs, setInputs] = useState({});

  // Endpoint to communicate data
  
  const endpoint = "http://localhost:5000/register";

  // useRef Hook to change elements based on input values

  const msg = useRef(null);

  // For redirecting

  const Navigate = useNavigate();
  
  // Function to handle change in input

  const handleChange = (event) => {

    // Get element in focus

    const e = event.target;
    const name = e.name;
    const value = e.value;
    setInputs(values => ({...values,[name]: value}))

    // Check input validity and show error message

    if(e.value){  
      if(["firstName","lastName"].includes(e.name)&/\d/.test(e.value)){
        msg.current.innerHTML="Names must contain only alphabets";
      }else if(e.name==="emailId"&!checkEmail(e.value)){
        msg.current.innerHTML="Please enter a valid email";
      }else if(e.name==="mobile"&&(isNaN(e.value)||e.value.length!==10)){
          msg.current.innerHTML="Please enter a valid 10 digit mobile number";   
      }else if(e.name==="password"&e.value.length<8){
        msg.current.innerHTML="Password must be at least 8 characters long";
      }
      else{
        msg.current.innerHTML="";
      }
    }else{
      msg.current.innerHTML="";
    }
  }
  
  // Function to handle submitting form

  const handleSubmit = async (event)=>{
    event.preventDefault();
    const form = event.target;
    
    // Check if any field is empty

    for (let i = 0; i < form.length; i++) {
      if(form[i].value===""){
        msg.current.innerHTML = "Please fill all fields";
        empty_flag=false;
        break;
      }
      empty_flag=true;
    }

    //Get the data from form

    const data = Array.from(form.elements)
      .filter((input)=>input.name)
      .reduce((obj, input)=> Object.assign(obj,{[input.name]:input.value}),{});

    // Check if all fields are valid

    flag = checkValidity(data);

    // Communicate with server

    if((flag&&empty_flag)===true){
      console.log("Submitting");
      
      //Communicate with server

      let result = await fetch(endpoint,{
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type':'application/json'
        }
      });

      try{
        result.text();
        console.log("Created user account successfully!");
      }catch(err){
        console.log(err);
      }
      if(result){
        alert("Signed up successfully");
        Navigate("/login");
      }
    }else{
      msg.current.innerHTML="Please check all fields...";
    }
  };
  
  // Fields  
  
  const cols = {
    "firstName":"text",
    "lastName":"text",
    "emailId":"email",
    "mobile":"string",
    "address":"text",
    "password":"password"
  };

  var f = [];
  var t = Object.values(cols);
  var l = Object.keys(cols);

  // Generate elements render

  for (let index = 0; index < l.length; index++) {
    f.push(<div key={index}>
                <label key={index}>{l[index].toUpperCase()}:</label><br/>
                <input key={l[index]} type={t[index]} name={l[index]} value={inputs[l[index]]||""} onChange={handleChange}/>
            </div>
    )
  }

  // Return elements

  return (<div>
    <h1>Sign up</h1>
    <form acton="" onSubmit={handleSubmit} id="sign_up_form">
        {f}
        <br/>
        <input type="submit" value="Submit"/>
    </form>
    <p ref={msg}></p>
  </div>
  )
}

export default SignUp;