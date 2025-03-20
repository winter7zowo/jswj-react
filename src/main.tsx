import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router"
import '@ant-design/v5-patch-for-react-19'
import './index.css'
import App from './App.tsx'
import ContentViewPage from './ContentViewPage.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="content" element={<ContentViewPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
