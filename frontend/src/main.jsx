import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/index'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
)
