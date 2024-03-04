import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import AuthTitle from "../components/AuthTitle";
import InputText from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import AuthLink from "../components/AuthLink";
import AuthErrorMessage from "../components/AuthErrorMessage";
const Register = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    username: "",
    phone: "",
    password: "",
    cpass: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, phone, password, cpass } = data;

    if (!username || !phone || !password || !cpass) {
      setError("All Fields Are Required!");
      return;
    }

    if (username.length < 5) {
      setError("Username must be greater than 4 characters");
      return;
    }

    const regex = /^\+639\d{9}$/;
    if (!regex.test(phone)) {
      setError("Invalid Number format expected: +639*********");
      return;
    }

    if (password.length < 6) {
      setError("password must be greater than 5 characters");
      return;
    }

    if (password !== cpass) {
      setError("Passwords don't matched");
      return;
    }

    fetch("http://localhost:5000/auth/register", {
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
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container>
      <AuthTitle title={"REGISTER"} />
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
          icon={"phone.png"}
          placeholder={"Phone number +639*********"}
          inputName={"phone"}
          value={data.phone}
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
      <div className="input">
        <InputText
          icon={"retry.png"}
          placeholder={"Confirm Password"}
          type="password"
          inputName={"cpass"}
          value={data.cpass}
          handleChange={handleChange}
        />
      </div>
      <div>
        <SubmitButton text={"REGISTER"} event={handleSubmit} />
      </div>
      <div>
        <AuthLink text={"Already have an account?"} path={"/"} />
      </div>
    </Container>
  );
};

export default Register;

const Container = styled.form`
  .input {
    margin: 1.7em;
  }
`;
