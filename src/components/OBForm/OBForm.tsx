import React from "react";
import Paper from "@mui/material/Paper";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./obform.css";

const OBForm = () => {
  return (
    <div className="form__container">
      <h4>Onboarding Form</h4>
      <br />
      <Form className="form__component">
        <div className="name__container">
          <div className="name__field">
            <Form.Label>
              <b>First Name</b>
            </Form.Label>
            <Form.Control type="name" />
          </div>
          <div className="name__field">
            <Form.Label>
              <b>Last Name</b>
            </Form.Label>
            <Form.Control type="name" />
          </div>
        </div>
        <Form.Label>
          <b>Phone Number</b>
        </Form.Label>
        <Form.Control type="number" />
        <Form.Label>
          <b>Corporation Number</b>
        </Form.Label>
        <Form.Control type="number" />
        <Button variant="dark" type="submit" className="submit__btn">
          Submit ➔
        </Button>
      </Form>
    </div>
  );
};

export default OBForm;
