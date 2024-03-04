import React from "react";

const AuthTitle = ({ title }) => {
  return (
    <h1
      style={{
        color: "white",
        textAlign: "center",
        marginTop: "0.2em",
        marginBottom: "0.5em",
      }}
    >
      {title}
    </h1>
  );
};

export default AuthTitle;
