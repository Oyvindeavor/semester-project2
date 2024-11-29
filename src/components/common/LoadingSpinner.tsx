import React from 'react';

const LoadingSpinner = () => (
  <div style={{ textAlign: 'center', padding: '1rem' }}>
    <div
      className="spinner"
      style={{ width: '50px', height: '50px', margin: '0 auto' }}
    ></div>
    <p>Loading...</p>
  </div>
);

export default LoadingSpinner;
