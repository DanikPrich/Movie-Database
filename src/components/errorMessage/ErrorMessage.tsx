import React from 'react';
import img from './error.gif'
import './errorMessage.scss'
const ErrorMessage = () => {
  return (
    <div className='error-message'>
      <h2>Something went wrong</h2>
      <img className="error-message__img" src={img} alt="error"/>
    </div>
  )
}

export default ErrorMessage;