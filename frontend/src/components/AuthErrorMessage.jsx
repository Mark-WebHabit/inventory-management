import React from "react";

const AuthErrorMessage = ({ error }) => {
  return (
    <p
      style={{
        textAlign: "center",
        color: "var(--invalid)",
        textTransform: "uppercase",
        fontSize: "0.8rem",
      }}
    >
      {error}
    </p>
  );
};

export default AuthErrorMessage;
