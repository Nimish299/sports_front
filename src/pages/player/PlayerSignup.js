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
import axios from 'axios';
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
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneNumber);
  }

  const SignupFormSubmit = async (e) => {
    if (name.length === 0) {
      return alert('Name should have at least one character');
    }
    if (!validateEmail(emailID)) {
      return alert('Please enter a valid email');
    }
    if (!isValidPassword(password)) {
      return alert(
        'Password should have at least one digit, one special character, one letter, and a minimum length of 6 characters'
      );
    }
    if (!isValidPhoneNumber(mobileNumber)) {
      return alert('Mobile number should have 10 digits');
    }

    if (cpassword === password) {
      e.preventDefault();
      const user = { name, emailID, password, mobileNumber };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}api/player/signup`,
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const json = response.data;

        if (response.status >= 200 && response.status < 300) {
          const { token } = json;
          setLoginflag(1);
          console.log('Frontend token:', token);
          localStorage.setItem('auth-token', token);
          axios.defaults.headers.common['Authorization'] =
            token.length > 0 ? token : '';
          return navigate('/player/home');
        } else {
          console.error('Error:', json.error);
          seterrDisplay(json.error);
          alert(errDisplay);
        }
      } catch (error) {
        console.error('Error:', error.response.data.error);
        seterrDisplay(error.response.data.error);
        // alert(errDisplay);
      }
    } else {
      return alert('Passwords do not match');
    }
  };

  return (
    <VStack spacing={2}>
      <FormControl onSubmit={SignupFormSubmit}>
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
      {/* <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input type='file' p={0.5} />
      </FormControl> */}
      <Button
        width='100%'
        colorScheme='blue'
        style={{ marginTop: 15 }}
        onClick={SignupFormSubmit}
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
