import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

interface userTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const RegisterPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<userTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmitFrom = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userInfo);
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmitFrom}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={userInfo.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({
                ...userInfo,
                name: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={userInfo.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({
                ...userInfo,
                email: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={userInfo.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({
                ...userInfo,
                password: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={userInfo.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({
                ...userInfo,
                confirmPassword: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to={`/login`}>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;
