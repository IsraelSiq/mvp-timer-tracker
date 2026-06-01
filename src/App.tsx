import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Dashboard } from '@/pages/Dashboard'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#13151f', color: '#e8e8e8', border: '1px solid #2a2d42' },
        }}
      />
      <Routes>
        <Route path="/"  element={<Dashboard />} />
        <Route path="*"  element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
