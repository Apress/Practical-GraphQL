import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!){
    signin(credentials: { password: $password, email: $email}) {
      userErrors {
        message
      }
      token
    }
  }
`

export default function Signin() {
  const [signin, { data, loading}] = useMutation(SIGNIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(data);
  const handleClick = () => {
    signin({ variables: { email, password}})
  };

  const [message, setMessage] = useState(null);
  useEffect(() => {
    if(data && data.signin.userErrors.length) setMessage(data.signin.userErrors[0].message);
    if(data && data.signin.token) {
      localStorage.setItem("prisma-token", data.signin.token);
      setMessage('SignIn successfully. Token Saved');
    }
  },[data])

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password"  value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {message && <p style={{ backgroundColor: 'blue', color: 'white', padding: '5px'}}>{message}</p>}
        <Button variant="primary" onClick={handleClick}>SignIn</Button>
      </Form>
    </div>
  );
}
