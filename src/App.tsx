import React from "react";
import styled from "styled-components";
import "./App.css";
import logo from "./assets/Mathnasium_logo.png";
import redPattern from "./assets/PatternsNumbersRedSmall.jpg";
import Form from "./components/Form/MainForm";

const ImageContainer = styled.div`
  background-color: black;
  width: 100vw;
`;

const LogoImage = styled.img`
  width: 40vw;
  margin: 24px 0;
`;

const FooterImageContainer = styled.div`
  background-color: black;
  width: 100vw;
  height: 83px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const FooterImage = styled.img`
  width: 100vw;
  margin: 0;
`;

function App() {
  return (
    <div className="App">
      <ImageContainer>
        <LogoImage src={logo} alt="logo" />
      </ImageContainer>
      <Title>Mathnasium Membership Payment Information</Title>
      <Form />
      <FooterImageContainer>
        <FooterImage src={redPattern} alt="footer pattern" />
      </FooterImageContainer>
    </div>
  );
}

export default App;

const Title = styled.h1`
  font-size: 2rem;
  width: 100vw;
`;
