/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {userState} from "../../store/atoms/user"
import {ParseInputType} from "../../../../../common/src/index"
import {useSetRecoilState} from 'recoil';
import { Card } from '@mui/material';

export function Signin() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userStat = useSetRecoilState(userState)
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const dataTosend :ParseInputType = {
        username:username,
        password:password
    }
      const response = await axios.post('http://localhost:3000/signin', dataTosend);

      const data = response.data;
      localStorage.setItem('token', data.token);

      // You can navigate to the desired page without reloading
      
      userStat({
        loadering:false,
        username:username
      })
      navigate('/News');
      // window.location.reload()
    } catch (error) {
      // Handle sign-in errors here and provide feedback to the user
      console.error('Sign-in error:', error);
    }
  };

  return (
    <center>
      <Card style={{border:"2px solid black",width:"300px",padding:"16px"}}>
        <div>
          <h1>Welcome back</h1>
          <div >
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
    </Card>
    </center>
  );
}
