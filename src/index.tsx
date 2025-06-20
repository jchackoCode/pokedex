import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';

const rootElement = document.getElementById('root'); // Ensure the 'root' id matches the div in index.html
if (!rootElement) {
  throw new Error(
    "Root container 'root' not found. Ensure the div with id 'root' exists in index.html."
  );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
