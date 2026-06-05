import { Link } from "react-router-dom";

export const Contact = () => {
    return (
        <div className="glass-container" style={{textAlign:"center"}}>
            <h1 className="page-title">Contáctanos</h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "var(--text-secondary)" }}>
                Si tienes alguna pregunta o necesitas ayuda en la terminal, no dudes en contactarnos.
            </p>
            <div style={{ padding: "20px", background: "rgba(255,255,255,0.5)", borderRadius: "12px", border: "1px dashed var(--pastel-blue)" }}>
                <p className="tech-font" style={{ color: "var(--pastel-purple)", fontSize: "1.2rem" }}>support@techcart.io</p>
            </div>
        </div>
    )
}