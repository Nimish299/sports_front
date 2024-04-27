import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { VStack } from '@chakra-ui/react';
// import axios from 'axios';
import { FlagState } from '../../context/FlagProvider';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useToast,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';

const CoachSignup = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const navigate = useNavigate();
  const { loginflag, setLoginflag } = FlagState();
  const [sport, setsport] = useState('');
  const [coaching_experience_years, setcoaching_experience_years] =
    useState('');
  const [certifications, setcertifications] = useState('');
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
  const sportList = [
    'Football',
    'Basketball',
    'Tennis',
    'Swimming',
    'Badminton',
  ];
  const certificationOptions = ['1', '2', '3', '4', '5+'];
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
      const user = {
        name,
        emailID,
        password,
        mobileNumber,
        sport,
        coaching_experience_years,
        certifications,
      };
      // console.log(user);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}api/coach/signup`,
          user,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const json = response.data;

        if (response.status === 200) {
          const { token } = json;
          setLoginflag(true);
          console.log('Frontend token:', token);
          localStorage.setItem('auth-token', token);
          axios.defaults.headers.common['Authorization'] =
            token.length > 0 ? token : '';
          return navigate('/coach/home');
        } else {
          console.error('Error:', json.error);
          seterrDisplay(json.error);
          alert(errDisplay);
        }
      } catch (error) {
        console.error('Error:', error.message);
        seterrDisplay(error.message);
        alert(errDisplay);
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

      <FormControl>
        <FormLabel htmlFor='sport'>Sport</FormLabel>
        <Select
          id='sport'
          value={sport}
          onChange={(e) => setsport(e.target.value)}
          placeholder='Select Sport'
        >
          {sportList.map((sportOption, index) => (
            <option key={index} value={sportOption}>
              {sportOption}
            </option>
          ))}
        </Select>
        <FormHelperText>
          Sports for which you want to apply as a coach
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='coachingExperienceYears'>Year experience</FormLabel>
        <Select
          id='coaching_experience_years'
          value={coaching_experience_years}
          onChange={(e) => setcoaching_experience_years(e.target.value)}
          placeholder='Select Years of Experience'
        >
          {certificationOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <FormHelperText>Years of coaching experience</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Certification </FormLabel>
        <Input
          type='text'
          className='form-control'
          id='certifications'
          aria-describedby='emailHelp'
          value={certifications}
          onChange={(e) => setcertifications(e.target.value)}
          placeholder='Enter Certification'
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

export default CoachSignup;
