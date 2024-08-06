"use client"; 
import React from 'react';

interface ErrorProps {
  error: Error;
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  return <h1>500 - Server Error</h1>;
};

export default ErrorPage;
