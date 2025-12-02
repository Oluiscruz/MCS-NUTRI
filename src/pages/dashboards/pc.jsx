import { Navigate, useNavigate } from "react-router-dom";

export default function PacienteDashboard() {

    const navigate = useNavigate();
    
    const goHome = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="container pc-desh">
            <div>PacienteDashboard</div>
            <button onClick={goHome}>Início</button>
        </div>
    )
}