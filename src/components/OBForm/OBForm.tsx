import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./obform.css";

type formInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  corpNumber: string;
};

const OBForm = () => {
  const canadianPhoneNumberRegEx =
    /^(\+?1?[ -]?(?:\([2-9]\d{2}\)[ -]?|[2-9]\d{2}[ -]?)\d{3}[ -]?\d{4})$/;

  const schema: ZodType<formInput> = z.object({
    firstName: z.string().max(50).min(2, { message: "First name is required" }),
    lastName: z.string().max(50).min(2, { message: "Last name is required" }),
    phoneNumber: z
      .string()
      .refine((input) => canadianPhoneNumberRegEx.test(input), {
        message: "Invalid phone number",
      }),
    corpNumber: z.string().length(9, { message: "Invalid corporation number" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInput>({
    resolver: zodResolver(schema),
  });

  const submitData: SubmitHandler<formInput> = (data: formInput) => {
    console.log(data);
    reset();
  };

  return (
    <div className="form__container">
      <h4>Onboarding Form</h4>
      <br />
      <Form className="form__component" onSubmit={handleSubmit(submitData)}>
        <div className="name__container">
          <div className="name__field">
            <Form.Label>
              <b>First Name</b>
            </Form.Label>
            <Form.Control type="text" {...register("firstName")} />
            {errors.firstName && (
              <span className="error__message">{errors.firstName.message}</span>
            )}
          </div>
          <div className="name__field">
            <Form.Label>
              <b>Last Name</b>
            </Form.Label>
            <Form.Control type="text" {...register("lastName")} />
            {errors.lastName && (
              <span className="error__message">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <Form.Label>
          <b>Phone Number</b>
        </Form.Label>
        <Form.Control type="text" {...register("phoneNumber")} />
        {errors.phoneNumber && (
          <span className="error__message">{errors.phoneNumber.message}</span>
        )}
        <Form.Label>
          <b>Corporation Number</b>
        </Form.Label>
        <Form.Control type="text" {...register("corpNumber")} />
        {errors.corpNumber && (
          <span className="error__message">{errors.corpNumber.message}</span>
        )}
        <Button variant="dark" type="submit" className="submit__btn">
          Submit ➔
        </Button>
      </Form>
    </div>
  );
};

export default OBForm;
