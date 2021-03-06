import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import {useNavigate} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import {useRouter} from 'next/router'
import axios from 'axios';
import swal from 'sweetalert';
import { Authentication } from '../../pages/web3apis/Authentication';
import { signupUser } from '../../pages/web3apis/signupUser';


export default function Login({loginType,web3,accounts}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status,setStatus]=useState('');
  let router=useRouter();

    const login = async(username,password,loginType,router) =>{
    let sucess = false;
     

    if(username && password){
        console.log(username,password)
         if(loginType=="Admin"){
             if(username=="Admin" && password == "blockchain"){       
                router.push("./admindashboard");
             }else{
               alert('invalid username/password');
             }
         }
         else{
             //logic for organization verification
             if( username && password){
                const response =  await axios.get('../api/getloginInfo');
                const flag=true
                  response.data.map(async(item)=>{
                    if(item.username == username && item.status){
                       let data = await Authentication(web3,accounts,username,password)
                       if(data)
                         router.push(`./orgdashboard?name=${username}`)
                       else
                          alert('Login Failed')
                    }
                    else{
                      if(flag){
                           alert('Waiting for Admin conformation');
                           flag=false
                      }
                           
                    }
                  })
             
             }
             else
             {
                 alert('invalid username / password')
             }
         }

    }
    else{
        alert('enter all fiels')
    }
    
}

const signup=async(username,password)=>{
    let sucess = false;
     
    if(username && password){
      await signupUser(web3,accounts,username,password)
      router.push(`./registration?username=${username}&password=${password}`);
    }
    else{
        alert('enter all fiels')
    }
}



const style={
        'margin-top':'100px',
}
  return (
    <center>
    <Box
    style={style}
      sx={{
        width: 500,
        height: 300,
        backgroundColor: '#b8ffef',
        '&:hover': {
          backgroundColor: '#b8ffef',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
        <h2>{loginType}</h2>
        <TextField
          onChange={event => setUsername(event.target.value)}
          sx={{width:350}}
          style={{'margin-top':'6px'}}
          required
          id="outlined-required"
          label="User name"
          defaultValue=""
        />

        <TextField
          onChange={event => setPassword(event.target.value)}
          sx={{width:350}}
          style={{'margin-top':'6px'}}
          required
          type='password'
          id="outlined-required"
          label="Password"
          defaultValue=""
        />
        <br/>

        <Button onClick={()=>login(username,password,loginType,router)} style={{'margin-top':'10px'}} variant="outlined" color="error">
          Login
        </Button >
        <br/>
        {loginType=="Admin"?<></>: <Button onClick={()=>signup(username,password)} style={{'margin-top':'6px'}} variant="outlined" color="error">
          Signup
        </Button>}

    </Box>
    </center>
  );
}
