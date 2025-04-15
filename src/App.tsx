import { Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Cadastro from './pages/cadastro'
import { HeaderBar } from '@/components/custom-componets/HeaderBar'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Cadastro />} />
      </Routes>
    </>
  )
}

export default App
