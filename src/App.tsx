import React from "react";
import "./App.css";
import Form from "./components/Form/MainForm";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Title>Mathnasium Membership Payment Information</Title>
      <Form />
    </div>
  );
}

export default App;

const Title = styled.h1`
  font-size: 2rem;
`;
