import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <div className="glass-container" style={{textAlign:"center", padding: "60px 20px"}}>
            <h1 className="tech-font" style={{ fontSize: "5rem", color: "var(--pastel-pink)", textShadow: "4px 4px 0 rgba(255, 183, 213, 0.3)", margin: "0 0 20px 0" }}>404</h1>
            <h2 className="page-title" style={{ fontSize: "2rem", color: "#2c5282" }}>Página No Encontrada</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "30px" }}>
                Parece que te has perdido en el ciberespacio. La terminal no puede localizar esta ruta.
            </p>
            <Link to="/">
                <button className="btn-tech btn-tech-primary">
                    Regresar al Inicio
                </button>
            </Link>
        </div>
    )
}