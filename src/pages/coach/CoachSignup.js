import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { VStack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CoachSignup = () => {
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errDisplay, seterrDisplay] = useState("");
  const navigate = useNavigate();

  // irrelevant states
  const [email, setEmail] = useState("");
  const [picloading, setPicLoading] = useState(false);
  const onSubmit = () => {};

  const SignupFormSubmit = async (e) => {
    e.preventDefault();
    const coach = { emailID, password };
    const response = await fetch(`/api/coach/signup`, {
      method: "POST",
      body: JSON.stringify(coach),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      return navigate("/coach/home");
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  return (
    <VStack spacing={2}>
      <FormControl className="SignupForm" onSubmit={SignupFormSubmit}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm password</FormLabel>
        <Input
          name="cpassword"
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={0.5}
          accept="image/*"
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        type="submit"
        onClick={SignupFormSubmit}
        width="100%"
        colorScheme="blue"
        style={{ marginTop: 15 }}
      >
        Sign Up
      </Button>
      <Link class="btn btn-primary" to="/" role="button">
        Back
      </Link>
      <div>{errDisplay && <p>{errDisplay}</p>}</div>
    </VStack>
  );
};

export default CoachSignup;
