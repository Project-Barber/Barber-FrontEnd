import React from 'react'
import './Index.css'
import Cadastro from   './pages/cadastro/index.tsx'
import { HeaderBar } from '@/components/custom-componets/HeaderBar'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <div className="App " >
      <Toaster position="top-right" />

        
        <HeaderBar />
        
        <Cadastro />
      </div>
      <div className="App"></div>
       
    </>
  )
}

export default App
