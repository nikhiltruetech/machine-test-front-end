import React, { useState } from "react";
import { Form, Button, Container, Image } from "react-bootstrap";
import axios from "axios";
import { baseUrl, uploadUrl } from "../../Service/config";
import UserTable from "../Table";
const SignupForm = () => {
  // States
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [userDetails, setUserdetails] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  // Handle Change
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  // Handle file change
  const fileChange = (e) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (e) => {
      setImage(e.target.result);
    };
  };
  // Submitting user details
  const handleSubmit = async (e) => {
    const { name, phone, password, email } = state;
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    axios.post(`${uploadUrl}`, formData);
    const payload = {
      name,
      email,
      phone,
      password,
    };
    const res = await axios.post(`${baseUrl}`, payload);
    setUserdetails(res.data);
  };
  return (
    <div>
      <Container>
        <Form autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={state.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={state.email}
              type="email"
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              name="phone"
              value={state.phone}
              type="number"
              onChange={handleChange}
              placeholder="Enter Phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={state.password}
              type="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={(e) => fileChange(e)} />
          </Form.Group>
          {file && <Image src={URL.createObjectURL(file)} height="100" />}
          <br />
          <br />
          {file && (
            <Button variant="danger" onClick={() => setFile("")}>
              Remove
            </Button>
          )}
          <br />
          <br />
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Submit
          </Button>
        </Form>
      </Container>
      <Container className="mt-5">
        <UserTable userDetails={userDetails} />
      </Container>
    </div>
  );
};

export default SignupForm;
