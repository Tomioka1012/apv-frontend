import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Layaouts
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
//pages
//public pages
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
//private page
import AdministrarPacientes from './paginas/AdministrarPacientes'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'
//context
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {
  

  

  return (
    <>
      <BrowserRouter>
          <AuthProvider>
            <PacientesProvider>
              {/* Rutas del área publica */}
              <Routes>
                <Route path='/' element={<AuthLayout/>}>
                  <Route index element={<Login/>}/>
                  <Route path='registrar' element={<Registrar/>}/>
                  <Route path='olvide-password' element={<OlvidePassword/>}/>
                  <Route path='olvide-password/:token' element={<NuevoPassword/>}/>
                  <Route path='confirmar/:id' element={<ConfirmarCuenta/>}/> 
                </Route>
                {/* Rutas del área privada */}
                <Route path="/admin" element={<RutaProtegida/>}>
                  <Route index element={<AdministrarPacientes/>}/>
                  <Route path='perfil' element={<EditarPerfil/>}/>
                  <Route path='cambiar-password' element={<CambiarPassword/>}/>
                </Route>
              </Routes>
            </PacientesProvider>
          </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
