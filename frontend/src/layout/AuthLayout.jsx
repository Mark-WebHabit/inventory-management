import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import styled from "styled-components";
const AuthLayout = () => {
  const loc = useLocation().pathname;

  useEffect(() => {
    fetch("http://localhost:5000/auth/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
          // navigate("/app");
          console.log(data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <Container>
      <FormContainer>
        <div className="icon-container">
          <img src={loc == "/" ? "login.png" : "register.png"} alt="register" />
        </div>
        <Outlet />
      </FormContainer>
    </Container>
  );
};

export default AuthLayout;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
`;

const FormContainer = styled.div`
  min-height: 400px;
  max-width: 500px;
  min-width: 450px;
  position: relative;
  background: var(--darkblue);
  border-radius: 1em;
  padding-top: 1em;

  .icon-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid white;
    position: absolute;
    top: -25%;
    left: 50%;
    transform: translate(-50%, 25%);
    cursor: pointer;

    &:hover {
      transform: translate(-50%, 25%) rotate(360deg);
    }
    & img {
      width: 100%;
    }
  }
`;
