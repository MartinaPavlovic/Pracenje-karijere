import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import keycloakService from './keycloak';

keycloakService.init(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
});
