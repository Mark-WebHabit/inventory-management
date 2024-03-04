import React from "react";
import styled from "styled-components";
const SubmitButton = ({ text, event }) => {
  return (
    <Container>
      <p onClick={event}>{text}</p>
    </Container>
  );
};

export default SubmitButton;

const Container = styled.div`
  text-align: center;
  color: var(--white);
  display: grid;
  place-items: center;
  cursor: pointer;

  & p {
    width: 50%;
    padding: 0.4em 1em;
    background: var(--gray);
    color: var(--darkblue);
    font-weight: bold;
    border-radius: 10px;
    border: 2px solid var(--darkblue);

    &:hover {
      color: var(--white);
      background: var(--darkblue);
      border: 2px solid var(--gray);
    }
  }
`;
