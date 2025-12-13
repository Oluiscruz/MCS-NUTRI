import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import App from './App.jsx'
import PacienteLogin from './pages/pcLogin.jsx'
import PacienteCadastro from './pages/pcCadastro.jsx';
import MedicoLogin from './pages/medLogin.jsx';
import MedicoCadastro from './pages/medCad.jsx';
import MedicoDashboard from './pages/dashboards/med.jsx';
import PacienteDashboard from './pages/dashboards/pc.jsx';
import Connection from './pages/connection.jsx';
import PerfilPaciente from './pages/perfil/paciente.jsx';
import { AuthProvider } from './context/context.jsx';
import './styles/index.scss'


axios.defaults.baseURL = 'http://localhost:3001';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/entrar" element={<Connection />} />
          <Route path="/medico/cadastro" element={<MedicoCadastro />} />
          <Route path="/paciente/cadastro" element={<PacienteCadastro />} />
          <Route path="/paciente/login" element={<PacienteLogin />} />
          <Route path="/medico/login" element={<MedicoLogin />} />
          <Route path="/medico/dashboard" element={<MedicoDashboard />} />
          <Route path="/paciente/dashboard" element={<PacienteDashboard />} />
          <Route path="/perfil/paciente" element={<PerfilPaciente />} />
        </Routes>
      </BrowserRouter>
    </ AuthProvider >
  </StrictMode>,
)
