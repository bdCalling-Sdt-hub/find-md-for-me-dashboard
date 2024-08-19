import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import './fonts.css';


  export const BASE_URL = import.meta.env.VITE_HOST_URL
  export const IMAGE_URL = import.meta.env.VITE_IMAGE_URL
  export const IMAGE_URL_1 = import.meta.env.VITE_IMAGE_URL_1

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
