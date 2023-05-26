import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  padding-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled(Field)`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 30px;
  box-shadow: 3px 3px 10px #0000009e;
`;

const Error = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #0f73ab;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = ({ setForm }) => {
  const router = useRouter();
  const handleSubmit = async (values, { setSubmitting }) => {
    let submitValues = { ...values, login: true, redirect: false };
    let res = await signIn("credentials", submitValues);
    console.log(res.status);
    if (res.status >= 200 && res.status <= 300) {
      router.reload();
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <LoginForm>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input type="email" id="email" name="email" />
            <Error name="email" component="div" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" id="password" name="password" />
            <Error name="password" component="div" />
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <div style={{ marginTop: "20px" }}>
            Dont have an account?{" "}
            <a onClick={() => setForm("register")}>Register</a>
          </div>
        </LoginForm>
      )}
    </Formik>
  );
};

export default Login;
