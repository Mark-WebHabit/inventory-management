import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthLink = ({ text, path }) => {
  return (
    <Container>
      <Link to={path}>{text}</Link>
    </Container>
  );
};

export default AuthLink;

const Container = styled.div`
  margin: 0.4em;
  display: grid;
  place-items: center;

  & a {
    text-decoration: none;
    color: var(--gray);
  }
`;
