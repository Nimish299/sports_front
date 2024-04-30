import { NavLink, useNavigate, Link } from 'react-router-dom';
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
  useToast,
} from '@chakra-ui/react';

const CoachLogin = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const { Loginflag, setLoginflag } = FlagState();

  const navigate = useNavigate();
  // const apiUrl = process.env.URL;
  // const LoginFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const coach = { emailID, password };
  //   const response = await fetch(`/api/coach/login`, {
  //     method: 'POST',
  //     body: JSON.stringify(coach),
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     console.log(json);

  //   } else {
  //     console.log(json.error);
  //     seterrDisplay(json.error);
  //   }
  // };

  // console.log('env =', process.env.REACT_APP_URL);
  const LoginFormSubmit = async (e) => {
    e.preventDefault();

    const user = { emailID, password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/coach/login`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setLoginflag(2);
        const token = response.data.token; // Get the token from response.data
        if (token && token.length > 0) {
          // Check if token is defined and has a length
          axios.defaults.headers.common['Authorization'] = token;
          console.log('Frontend token:', token);
          localStorage.setItem('auth-token', token);

          return navigate('/coach/home');
          // return navigate('/player/home');
        } else {
          console.error('Error: Token is undefined or empty');
          seterrDisplay('Token is undefined or empty');
        }
      } else {
        console.error('Error:', response.data.error);
        seterrDisplay(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
      seterrDisplay(error.message);
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
            placeholder='Enter email'
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type='password'
            className='form-control'
            id='exampleInputPassword1'
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
      </VStack>
    </div>
  );
};

export default CoachLogin;
