import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { baseUrl } from "../../Service/config";
import UserTable from "../Table";
const SignupForm = () => {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState();
  const [userDetails,setUserdetails] = useState([])
  // Submitting user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const payload = {
      name,
      email,
      phone,
      password,
    };
    const res = await axios.post(`${baseUrl}`, payload);
    setUserdetails(res.data)
    localStorage.setItem("user", res.data);
  };
  return (
    <div>
      <Container>
        <Form autoComplete="off">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={phone}
              type="number"
              onChange={(e) => setphone(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </Form>
      </Container>
      <Container className="mt-5">
        <UserTable userDetails={userDetails}/>
      </Container>
    </div>
  );
};

export default SignupForm;
