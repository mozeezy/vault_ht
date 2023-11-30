import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./obform.css";
import axios from "axios";
import { toast } from "react-toastify";

import { schema } from "../../formSchema";

interface FormInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  corpNumber: string;
}

const OBForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, control, trigger, setValue } =
    useForm<FormInput>({
      resolver: zodResolver(schema),
      shouldUnregister: false,
    });

  const validateOnBlur = async (fieldName: keyof FormInput) => {
    try {
      await trigger(fieldName);
    } catch (error) {}
  };

  const submitData: SubmitHandler<FormInput> = async (data, e?) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "https://vault-test-task-api.onrender.com/profile-details",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          corporationNumber: data.corpNumber,
          phone: data.phoneNumber.includes("+1")
            ? data.phoneNumber
            : `+1${data.phoneNumber}`,
        }
      );

      if (response.status === 200) {
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("phoneNumber", "");
        setValue("corpNumber", "");
        toast.success("Form submitted successfully!");
      } else {
        console.log(response.data);
        toast.error("Failed to submit form:", response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form__container">
      <h5>Onboarding Form</h5>
      <br />
      <Form className="form__component" onSubmit={handleSubmit(submitData)}>
        <Form.Group className="name__container">
          <Form.Group className="name__field">
            <Form.Label>
              <b>First Name</b>
            </Form.Label>
            <Controller
              render={({ field, fieldState }) => (
                <>
                  <Form.Control
                    {...register("firstName")}
                    {...field}
                    onBlur={() => validateOnBlur("firstName")}
                  />
                  {fieldState?.isDirty && fieldState?.error && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </>
              )}
              control={control}
              name="firstName"
            />
          </Form.Group>
          <Form.Group className="name__field">
            <Form.Label>
              <b>Last Name</b>
            </Form.Label>
            <Controller
              render={({ field, fieldState }) => (
                <>
                  <Form.Control
                    {...register("lastName")}
                    {...field}
                    onBlur={() => validateOnBlur("lastName")}
                  />
                  {fieldState?.isDirty && fieldState?.error && (
                    <Form.Text className="text-danger">
                      {fieldState.error.message}
                    </Form.Text>
                  )}
                </>
              )}
              control={control}
              name="lastName"
            />
          </Form.Group>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <b>Phone Number</b>
          </Form.Label>
          <Controller
            render={({ field, fieldState }) => (
              <>
                <Form.Control
                  {...register("phoneNumber")}
                  {...field}
                  onBlur={() => validateOnBlur("phoneNumber")}
                />
                {fieldState?.isDirty && fieldState?.error && (
                  <Form.Text className="text-danger">
                    {fieldState.error.message}
                  </Form.Text>
                )}
              </>
            )}
            control={control}
            name="phoneNumber"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <b>Corporation Number</b>
          </Form.Label>
          <Controller
            render={({ field, fieldState }) => (
              <>
                <Form.Control
                  {...register("corpNumber")}
                  {...field}
                  onBlur={() => validateOnBlur("corpNumber")}
                />
                {fieldState?.isDirty && fieldState?.error && (
                  <Form.Text className="text-danger">
                    {fieldState.error.message}
                  </Form.Text>
                )}
              </>
            )}
            control={control}
            name="corpNumber"
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="submit__btn">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp;Submitting...
            </>
          ) : (
            "Submit ➔"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default OBForm;
