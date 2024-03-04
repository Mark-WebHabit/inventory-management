import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthTitle from "../components/AuthTitle";
import InputText from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import AuthLink from "../components/AuthLink";
import AuthErrorMessage from "../components/AuthErrorMessage";
const Login = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = data;

    if (!username || !password) {
      setError("All fields are required");
    }

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Something went wrong");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          navigate("/app");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      <AuthTitle title={"LOGIN"} />
      {error && <AuthErrorMessage error={error} />}
      <div className="input">
        <InputText
          icon={"user.png"}
          placeholder={"Username"}
          inputName={"username"}
          value={data.username}
          handleChange={handleChange}
        />
      </div>
      <div className="input">
        <InputText
          icon={"padlock.png"}
          placeholder={"Create Password"}
          type="password"
          inputName={"password"}
          value={data.password}
          handleChange={handleChange}
        />
      </div>
      <div>
        <SubmitButton text={"LOGIN"} event={handleSubmit} />
      </div>
      <div>
        <AuthLink text={"Create an account?"} path={"/register"} />
      </div>
    </Container>
  );
};

export default Login;
const Container = styled.form`
  .input {
    margin: 2em;
  }
`;
