import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./obform.css";
import { corpNumberArray } from "../../corpNumberArray";
import axios from "axios";
import { toast } from "react-toastify";
import { isCanadianNumber } from "../../isCanadianNumber";
import { Oval } from "react-loader-spinner";

type formInput = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  corpNumber: string;
};

const OBForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const schema: ZodType<formInput> = z.object({
    firstName: z.string().max(50).min(2, { message: "First name is required" }),
    lastName: z.string().max(50).min(2, { message: "Last name is required" }),
    phoneNumber: z.string().refine((value) => isCanadianNumber(value), {
      message: "Invalid Phone Number",
    }),
    corpNumber: z.string().refine((value) => corpNumberArray.includes(value), {
      message: "Invalid Corporation Number",
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInput>({
    resolver: zodResolver(schema),
  });

  const submitData: SubmitHandler<formInput> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://vault-test-task-api.onrender.com/corporationNumber/${data.corpNumber}`
      );
      if (response.data.valid) {
        const postResponse = await axios.post(
          "https://vault-test-task-api.onrender.com/profile-details",
          {
            firstName: data.firstName,
            lastName: data.lastName,
            corporationNumber: data.corpNumber,
            phone: `+1${data.phoneNumber}`,
          }
        );
        if (postResponse.status === 200) {
          toast.success("Form submitted successfully");
          setLoading(false);
          reset();
        } else {
          toast.error("Error submitting form");
        }
      }
    } catch (error) {
      toast.error("Invalid Corporation Number");
    }
  };
  return (
    <div className="form__container">
      <h5>Onboarding Form</h5>
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
        {loading ? (
          <Oval
            height="30"
            width="30"
            color="black"
            ariaLabel="oval-loading"
            secondaryColor="white"
            wrapperStyle={{
              marginTop: "0.5rem",
              alignSelf: "center",
            }}
          />
        ) : (
          <Button variant="dark" type="submit" className="submit__btn">
            Submit ➔
          </Button>
        )}
      </Form>
    </div>
  );
};

export default OBForm;
