import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Cadastro from './pages/cadastro'
import { HeaderBar } from '@/components/custom-componets/HeaderBar'
import { Toaster } from 'react-hot-toast'
import Login from './pages/login'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  )
}

export default App
