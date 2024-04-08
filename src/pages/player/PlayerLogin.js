import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FlagState } from '../../context/FlagProvider';

import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

const PlayerLogin = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const navigate = useNavigate();

  const { loginflag, setLoginflag } = FlagState();

  console.log(loginflag);

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };

    try {
      const response = await fetch(
        `https://sports-back.onrender.com/api/player/login`,
        {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setLoginflag(true);
        return navigate('/player/home');
      } else {
        const json = await response.json();
        console.log(json.error);
        seterrDisplay(json.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any network errors or exceptions here
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
  );
};

export default PlayerLogin;
