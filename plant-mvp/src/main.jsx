import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import App from './App.jsx'
import ManagePlants from './ManagePlants.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/manage" element={<ManagePlants />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
