import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  const handleHideSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    fetch("http://localhost:5000/auth/isvalidsession", {
      method: "GET",
      // credentials: "include",
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
        console.log(error.message);
      });
  }, []);

  return (
    <Container showSideBar={showSideBar}>
      <Sidebar
        handleHideSideBar={handleHideSideBar}
        showSideBar={showSideBar}
      />
      <Outlet />
    </Container>
  );
};

export default MainLayout;

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`;
