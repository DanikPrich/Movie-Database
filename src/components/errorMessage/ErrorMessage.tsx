import React from 'react';
import styled from 'styled-components';
import img from './error.gif';

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessageText = styled.h2`
  text-align: center;
`;

const ErrorMessageImage = styled.img`
  display: block;
  height: 400px;
  object-fit: contain;
  margin: 0 auto;
`;

const ErrorMessage = () => {
  return (
    <ErrorMessageContainer>
      <ErrorMessageText>Something went wrong</ErrorMessageText>
      <ErrorMessageImage src={img} alt="error"/>
    </ErrorMessageContainer>
  )
}

export default ErrorMessage;
