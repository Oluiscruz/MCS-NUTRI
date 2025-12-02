import { Navigate, useNavigate } from "react-router-dom"

export default function MedicoDashboard() {

    const navigate = useNavigate();

    const goHome = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="container med-desh">
        <div>MedicoDashboard</div>
        <button onClick={goHome}>Início</button>
        </div>
    )
}