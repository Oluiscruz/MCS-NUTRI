import "./styles/index.scss";
import Home from "./pages/home/home.jsx";
import { useEffect, useState } from "react";
import { Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


function App() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const alreadyVisited = localStorage.getItem('welcome');

    if (!alreadyVisited) {
      setShowModal(true);
      localStorage.setItem('welcome', 'true');
    }
  }, []);

  const fecharModal = () => {
    setShowModal(false);
  };

  const Agendamento = () => {
    navigate('/entrar');
  };

  return (
    <div className="container">
      <Home />

      {showModal && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="btn-fechar">
              <button onClick={() => setShowModal(false)}><Minimize2 size={18} /></button>
            </div>

            <div className="modal-msg">
              <h2>Bem-vindo(a)!</h2>
              <p>Crie sua conta e faça um agendamento com a nutri</p>
            </div>
            <div className="modal-btn">
              <button onClick={Agendamento}>Agendar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
