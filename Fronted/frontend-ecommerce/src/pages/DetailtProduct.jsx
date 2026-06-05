import { useState,useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const DetalleProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    const fetchProductos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/productos/${id}`);
            if (response.ok) {
                console.log("Producto Encontrado");
                const data = await response.json();
                setProducto(data);


            } else {
                console.log("Producto No Encontrado");
            }


        } catch (error) {
            console.log("Error en el serivdor", error);
        }
    }

     useEffect(() => {
        fetchProductos();
    }, [id]);


    if(!producto) return <div className="glass-container"><h2 className="page-title">Producto no encontrado</h2></div>
    return (
        <div className="glass-container" style={{ textAlign: "center" }}>
            <h1 className="page-title">{producto.nombre}</h1>
            
            <div style={{ background: "rgba(255,255,255,0.5)", padding: "30px", borderRadius: "16px", margin: "20px 0", border: "1px solid var(--pastel-blue)" }}>
                <p className="tech-font" style={{ fontSize: "2.5rem", color: "var(--accent-hover)", margin: "0" }}>${producto.precio}</p>
                
                <div style={{ display: "inline-block", background: "var(--pastel-pink)", color: "#fff", padding: "4px 12px", borderRadius: "12px", fontWeight: "bold", margin: "10px 0" }}>
                    {producto.categoria}
                </div>
                
                <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", margin: "20px 0" }}>{producto.descripcion}</p>
                
                <p className="tech-font" style={{ color: producto.stock > 0 ? "var(--success)" : "var(--error)", fontWeight: "bold" }}>
                    STOCK DISPONIBLE: {producto.stock}
                </p>
            </div>
            
            <Link to="/productos">
                <button className="btn-tech">
                    Volver a Productos
                </button>
            </Link>
        </div>
    )
}