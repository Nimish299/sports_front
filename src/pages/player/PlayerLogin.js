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

const PlayerLogin = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const navigate = useNavigate();

  const { loginflag, setLoginflag } = FlagState();

  console.log(loginflag);

  // const LoginFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const user = { emailID, password };

  //   try {
  //     const response = await axios.post(`/api/player/login`, user, {
  //       // withCredentials:true,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     // const data = response.data;

  //     const json = await response.json();

  //     if (response.status === 200) {
  //       setLoginflag(true);
  //       const { token } = json;

  //       console.log('front end token', token);

  //       localStorage.setItem('auth-token', token);

  //       // console.log(data);

  //       return navigate('/player/home');
  //     } else {
  //       console.log(json.error);
  //       seterrDisplay(json.error);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     // Handle error appropriately
  //   }
  // };

  function printAxiosHeaders() {
    // Get default headers from Axios
    const headers = axios.defaults.headers.common;

    // Print each header
    Object.keys(headers).forEach((header) => {
      console.log(`${header}: ${headers[header]}`);
    });
  }

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };
    try {
      const response = await axios.post(
        `https://sports-back.onrender.com/api/player/login`,
        user,
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

        // printAxiosHeaders();

        console.log('Frontend token:', token);
        localStorage.setItem('auth-token', token);
        setLoginflag(true);
        return navigate('/player/home');
      } else {
        console.error('Error:', response.data.error);
        seterrDisplay(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
      seterrDisplay(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setLoginflag(true);
    }
  }, []);
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
  );
};

export default PlayerLogin;
