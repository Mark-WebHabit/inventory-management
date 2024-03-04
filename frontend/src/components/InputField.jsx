import React from "react";
import styled from "styled-components";
const InputText = ({
  icon,
  placeholder,
  type = "text",
  inputName,
  data,
  handleChange,
}) => {
  const id = Array.from({ length: 10 })
    .map((el) => Math.floor(Math.random() * 100 + 1))
    .join()
    .toString();

  return (
    <Container>
      <label htmlFor={id}>
        <img src={icon} alt="Icon.png" />
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={inputName}
        onChange={handleChange}
      />
    </Container>
  );
};

export default InputText;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.4em;

  & label {
    display: flex;
    align-items: center;
  }

  input {
    flex: 1;
    border: none;
    padding: 0.3em;
    font-size: 1rem;

    &:focus {
      outline: 2px solid var(--valid);
    }
  }
`;
