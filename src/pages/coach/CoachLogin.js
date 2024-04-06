import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

  const navigate = useNavigate();

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const coach = { emailID, password };
    const response = await fetch(`/api/coach/login`, {
      method: 'POST',
      body: JSON.stringify(coach),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      return navigate('/coach/home');
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  // irrelevant stuff
  const onSubmit = () => {};

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
        <Button
          width='100%'
          colorScheme='red'
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmailID('123coach@gmail.com');
            setPassword('12345');
          }}
        >
          Get Guest user Credentials
        </Button>
        <NavLink className='btn btn-primary my-3' to='/'>
          back
        </NavLink>

        <div>{errDisplay && <p>{errDisplay}</p>}</div>
      </VStack>
    </div>
  );
};

export default CoachLogin;
