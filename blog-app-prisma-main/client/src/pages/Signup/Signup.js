import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const SIGNUP = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!, $bio: String!){
    signup(credentials: { password: $password, email: $email}, name: $name, bio: $bio) {
      userErrors { message }
      token
    }
  }
`

export default function Signup() {
  const [signup, { data, loading}] = useMutation(SIGNUP);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const handleClick = () => signup({ variables: { email, password, name, bio}});
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if(data && data.signup.userErrors.length) setMessage(data.signup.userErrors[0].message);
    if(data && data.signup.token) {
      localStorage.setItem("prisma-token", data.signup.token);
      setMessage('Signup successfully. Token Saved');
    }
  },[data])

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            placeholder="Enter Bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        {message && <p style={{ backgroundColor: 'blue', color: 'white', padding: '5px'}}>{message}</p>}
        <Button variant="success" onClick={handleClick}>Signup</Button>
      </Form>
    </div>
  );
}
