import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  // useToast,
  VStack,
} from '@chakra-ui/react';
import { FlagState } from '../../context/FlagProvider';

const PlayerSignup = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const navigate = useNavigate();
  const { loginflag, setLoginflag } = FlagState();

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/;
    return passwordRegex.test(password);
  }
  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  const LoginFormSubmit = async (e) => {
    if (name.length === 0) {
      return alert('name should have atleast one character');
    }
    if (!validateEmail(emailID)) {
      return alert('please enter a valid email');
    }
    if (!isValidPassword(password)) {
      return alert(
        'Password should have at least one digit, one special character, one letter, and a minimum length of 6 characters'
      );
    }
    if (!isValidPhoneNumber(mobileNumber)) {
      return alert('mobile number should have 10 digits');
    }

    if (cpassword === password) {
      e.preventDefault();
      const user = { name, emailID, password, mobileNumber };
      const response = await fetch(`/api/player/signup`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setLoginflag(true);
        return navigate('/player/home');
      } else {
        console.log(json.error);
        seterrDisplay(json.error);
        alert(errDisplay);
      }
    } else {
      return alert('Passwords do not match');
    }
  };

  return (
    <VStack spacing={2}>
      <FormControl onSubmit={LoginFormSubmit}>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          className='form-control'
          id='name'
          aria-describedby='emailHelp'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter name'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          placeholder='Enter email'
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Mobile Number</FormLabel>
        <Input
          type='tel' // Set type to 'tel' for mobile numbers
          className='form-control'
          id='mobileNumber'
          aria-describedby='mobileNumberHelp'
          value={mobileNumber}
          onChange={(e) => setmobileNumber(e.target.value)}
          placeholder='Enter mobile number - 10 digits'
        />
        <FormHelperText>We'll never share your mobile number.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='At least 5 digits or characters'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm password</FormLabel>
        <Input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input type='file' p={0.5} />
      </FormControl>
      <Button
        width='100%'
        colorScheme='blue'
        style={{ marginTop: 15 }}
        onClick={LoginFormSubmit}
      >
        Sign Up
      </Button>
      <Link class='btn btn-primary' to='/' role='button'>
        Back
      </Link>
    </VStack>
  );
};

export default PlayerSignup;
