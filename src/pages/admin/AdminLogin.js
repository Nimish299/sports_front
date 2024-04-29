import { useNavigate, Link } from 'react-router-dom';
// import { useState } from 'react';
import { useState, useEffect } from 'react';
import { FlagState } from '../../context/FlagProvider';
import axios from 'axios';
import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  // useToast,
} from '@chakra-ui/react';


const AdminLogin = () => {
    const navigate = useNavigate();
    const [emailID, setEmailID] = useState('');
    const [password, setPassword] = useState('');
    const [errDisplay, seterrDisplay] = useState('');
    const { loginflag, setLoginflag } = FlagState();

    const LoginFormSubmit = async (e) => {
        e.preventDefault();
        const admin = { emailID, password };
        try {
          const response = await axios.post(
            `http://localhost:4000/api/admin/login`,
            admin,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
            
          );
    
          if (response.status === 200) {
            const { token } = response.data;
            axios.defaults.headers.common['Authorization'] =
              token.length > 0 ? token : '';
    
            
    
            console.log('Frontend token:', token);
            localStorage.setItem('auth-token', token);
            setLoginflag(true);
            return navigate('/admin/dashboard');
          }
           else {
            console.error('Error:', response.data.error);
            seterrDisplay(response.data.error);
            setTimeout(() => {
              seterrDisplay('');
            }, 2000);
          }
        }
         catch (error) {
          console.error('Error:', error.message);
          seterrDisplay(error.response.data.error);
      setTimeout(() => {
        seterrDisplay('');
      }, 2000);
        }
      };
    
  return (
    <div>
    <VStack spacing={2}>
      <FormControl onSubmit={LoginFormSubmit}>
        <FormLabel>Email address</FormLabel>
        <Input
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          name='password'
          placeholder='Enter password'
        />
      </FormControl>

      <Button
        width='100%'
        colorScheme='blue'
        style={{ marginTop: 15 }}
        type='submit'
        onClick={LoginFormSubmit}
      >
        Login
      </Button>

      <div>{errDisplay && <p>{errDisplay}</p>}</div>

      <Link class='btn btn-primary' to='/' role='button'>
        Back
      </Link>
     
    </VStack>
  </div>
  )
}

export default AdminLogin
