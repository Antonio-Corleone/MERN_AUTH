import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface FromContainerProps {
  children: React.ReactNode;
}

const FormContainer: React.FC<FromContainerProps> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
