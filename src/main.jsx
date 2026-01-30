import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/context.jsx';
import axios from 'axios';
import App from './App.jsx'
import Acessar from './pages/acesso/acessar.jsx';
import Paciente_cadastro from './pages/cadastro/paciente_cadastro.jsx';
import Paciente_login from './pages/login/paciente_login.jsx'
import Nutricionista_cadastro from './pages/cadastro/nutri_cadastro.jsx';
import Nutricionista_login from './pages/login/nutri_login.jsx';
import Nutricionista_perfil from './pages/perfil-nutri/nutri.jsx';
import Agenda from './pages/perfil-nutri/agenda.jsx';
import Paciente_perfil from './pages/perfil-paciente/paciente.jsx';
import './styles/index.scss'

axios.defaults.baseURL = 'http://localhost:3001';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/entrar" element={<Acessar />} />
          <Route path="/nutricionista/cadastro" element={<Nutricionista_cadastro />} />
          <Route path="/nutricionista/login" element={<Nutricionista_login />} />
          <Route path="/paciente/cadastro" element={<Paciente_cadastro />} />
          <Route path="/paciente/login" element={<Paciente_login />} />
          <Route path="/nutricionista/perfil" element={<Nutricionista_perfil />} />
          <Route path="/nutricionista/agenda" element={<Agenda />} />
          <Route path="/paciente/perfil" element={<Paciente_perfil />} />
        </Routes>
      </BrowserRouter>
    </ AuthProvider >
  </StrictMode>,
)