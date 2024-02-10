import React, { useState, useRef } from 'react';
function checkEmail(s){
  return String(s)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
const SignUp = () =>{
  const [inputs, setInputs] = useState({});
  const msg = useRef(null);
  const disable_button = useRef(null);
  const endpoint = "http://localhost:5000/register";
  let flag=false;

  const handleChange = (event) => {
    const e = event.target;
    const name = e.name;
    const value = e.value;
    flag=false;
    setInputs(values => ({...values,[name]: value}))
    if(e.value){  
      if(["firstName","lastName"].includes(e.name)&&/\d/.test(e.value)){
        msg.current.innerHTML="Names must contain only alphabets";
      }else if(e.name==="emailId"&&!checkEmail(e.value)){
        msg.current.innerHTML="Please enter a valid email";
      }else if(e.name=="mobile"&&isNaN(e.value)||e.value.length!==10){
          msg.current.innerHTML="Please enter a valid 10 digit mobile number";   
      }else if(e.name==="password"&&e.value.length<8){
        msg.current.innerHTML="Password must be at least 8 characters long";
      }else{
        flag=true;
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
        flag=false;
        break;
      }
    }

    //Get the data from form
    
    const data = Array.from(event.target.elements)
    .filter((input)=>input.name)
    .reduce((obj, input)=> Object.assign(obj,{[input.name]:input.value}),{});

    //Send data to server

    let result = await fetch(endpoint,{
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type':'application/json'
      }
    });
    try{
      result = await result.json();
    }catch(err){
      console.log(err);
    }
    if(result){
      alert("Signed up successfully");
    }
  };
  
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
  for (let index = 0; index < l.length; index++) {
    f.push(<div key={index}>
                <label key={index}>{l[index]}</label>
                <input key={l[index]} type={t[index]} name={l[index]} value={inputs[l[index]]||""} onChange={handleChange}/>
            </div>
    )
  }
  return (<div>
    <h1>Sign up</h1>
    <form acton="" onSubmit={handleSubmit} id="sign_up_form">
        {f}
        <input type="submit" value="Submit" ref={disable_button} />
    </form>
    <p ref={msg}></p>
  </div>
  )
}

export default SignUp;
