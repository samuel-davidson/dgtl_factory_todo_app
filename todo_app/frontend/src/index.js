import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeWrapper from './components/designtheme';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeWrapper >
      <App />
    </ThemeWrapper>
  </React.StrictMode>
);

reportWebVitals();
