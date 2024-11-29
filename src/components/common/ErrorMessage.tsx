import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div style={{ color: 'red', textAlign: 'center', padding: '1rem' }}>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
