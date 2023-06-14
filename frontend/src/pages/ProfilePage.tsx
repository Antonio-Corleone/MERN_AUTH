import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateMutation } from "../redux/slices/userApiSlice";

import FormContainer from "../components/FormContainer";
import { setCredentials } from "../redux/slices/authSlices";
import { RootState } from "../redux/store";
import Loader from "../components/Loader";

interface userTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<userTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [update, { isLoading }] = useUpdateMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setUserData({
        ...userData,
        name: userInfo.name,
        email: userInfo.email,
      });
    }
  }, [userInfo?.name, userInfo?.email]);

  const handleSubmitFrom = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const updatedUser = {
          _id: userInfo ? userInfo._id : null,
          name: userData?.name,
          email: userData?.email,
          password: userData?.password,
          confirmPassword: userData?.confirmPassword,
        };
        const res = await update({ ...updatedUser }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Your profile has been updated successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
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
            value={userData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={userData.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserData({
                ...userData,
                confirmPassword: e.target.value,
              })
            }
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
        {isLoading && <Loader />}
      </Form>
      {/* <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row> */}
    </FormContainer>
  );
};

export default ProfilePage;
