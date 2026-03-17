import React from "react";
import { Spinner, Container } from "react-bootstrap";

import "./style.scss";

function LoadingSpinner() {
  return (
    <Container fluid className="spinner-wrapper">
      <Spinner
        animation="border"
        variant="secondary"
        className="spinner-height"
      />
    </Container>
  );
}

export default LoadingSpinner;
