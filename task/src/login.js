import React, { useState } from 'react';
import { useRef } from 'react';
function checkEmail(s){
  return String(s)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const Login = () =>{

  const [inputs, setInputs] = useState({});
  const myRef = useRef(null);
  const disable_button = useRef(null);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values,[name]: value}))
    const e = event.currentTarget;
    if(e.name==="emailId/number"){
      if((!checkEmail(e.value)&&isNaN(e.value))||(!isNaN(e.value)&&e.value.length!==10)&&(e.value)){
        myRef.current.innerHTML="Please enter a valid email or mobile number";
      }else{
        myRef.current.innerHTML="";
      }
    }else if(e.name==="password"){
      if(e.value.length<8&&e.value){
        myRef.current.innerHTML="Password must be at least 8 characters long";
      }else{
        myRef.current.innerHTML="";
      }
    }
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    Object.keys(inputs).forEach(i => {
      console.log(inputs[i]);
    });
    console.log(inputs);
  }

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
        <input type="submit" value="Submit" ref={disable_button} />
    </form>
    <p ref={myRef}></p>
  </div>
  )
}

export default Login;
