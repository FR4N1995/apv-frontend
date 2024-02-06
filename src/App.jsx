import {BrowserRouter, Routes, Route} from 'react-router-dom'
//paginas Principales (layots)
import AuthLayout from "./layout/AuthLayout";
import Admon from './layout/Admon';

// paginas publicas 
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import NuevoPassword from './paginas/NuevoPassword';

//paginas Privadas
import AdministarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';


import { AuthProvider } from './context/AuthPtovider';
import {PacientesProvider} from './context/PacientesProvider'
function App() {
  
  return (
      <BrowserRouter>
            <AuthProvider>
              <PacientesProvider>
                    <Routes>
                        <Route path='/' element={<AuthLayout/>}>
                              <Route index element={<Login />} />
                              <Route path='registrar' element={<Registrar />} />
                              <Route path='olvide-password' element={<OlvidePassword />} />
                              <Route path='olvide-password/:token' element={<NuevoPassword />} />
                              <Route path='confirmar/:token' element={<ConfirmarCuenta />} />
                        </Route>

                        <Route path='/admin' element={<Admon />}>
                            <Route index element={<AdministarPacientes />} />
                            <Route path='perfil' element={<EditarPerfil />} />
                            <Route path='cambiar-password' element={<CambiarPassword />} />
                            
                        </Route>

                      </Routes>
                </PacientesProvider>
            </AuthProvider>
      </BrowserRouter>
  )
}

export default App
