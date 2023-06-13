import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/slices/userApiSlice";
import { setCredentials } from "../redux/slices/authSlices";
import FormContainer from "../components/FormContainer";
import { RootState } from "../redux/store";
import Loader from "../components/Loader";

interface userTypes {
  email: string;
  password: string;
}
const LoginPage: React.FC = () => {
  const [userData, setUserData] = useState<userTypes>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmitFrom = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(userData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmitFrom}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={userData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
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
            value={userData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
