import '@ant-design/v5-patch-for-react-19'
import './index.css'
import App from './App.tsx'
import ContentViewPage from './pages/ContentViewPage.tsx'
import ManageTagPage from './pages/ManageTagPage.tsx'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="content" element={<ContentViewPage />} />
        <Route path="tags" element={<ManageTagPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  <App />
)