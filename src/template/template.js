import React from "react";
import Header from "../components/header/header";

const Template = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Template;
