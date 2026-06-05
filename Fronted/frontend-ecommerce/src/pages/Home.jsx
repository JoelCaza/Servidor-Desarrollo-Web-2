import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div className="glass-container" style={{textAlign:"center"}}>
            <h1 className="page-title">Bienvenido a TechCart</h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "var(--text-secondary)" }}>
                Explora nuestra amplia gama de productos y encuentra lo que necesitas en la nueva era digital.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <Link to="/productos">
                    <button className="btn-tech btn-tech-primary">Ver Productos</button>
                </Link>
                <Link to="/mispedidos">
                    <button className="btn-tech">Mis Pedidos</button>
                </Link>
            </div>
        </div>
    )
}