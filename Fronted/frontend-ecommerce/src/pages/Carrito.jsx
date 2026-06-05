import { useContext,useState } from "react";
import { ContextCart } from "../services/ContextCart.jsx";


export const Carrito = () => {
    const {carrito,eliminarDelCarrito,vaciarCarrito} = useContext(ContextCart);
    const {mensaje,setMensaje} =useState("");

    const total = carrito.reduce((acc, item) => acc +(item.precio * item.cantidad),0);

    const handleRealizarPedido = async () => {
        const token = localStorage.getItem("token");

        if(!token){
            console.log("Debes iniciar sesion");
            return;
        }

         try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/pedidos/realizarPedido`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                
                },
                    body: JSON.stringify({ carrito})
            });
            

            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}. No se encontro la ruta en el servidor`);

            } 

            const data = await res.json();
            console.log("Pedido Creado Exitosamente");
            vaciarCarrito();

        } catch (error) {
            console.log("Error al inciar sesion", error);
        }



    };

    return(
        <div className="glass-container">
            <h1 className="page-title">Carrito de Compras</h1>

            {carrito.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>El carrito está vacío. ¡Es hora de explorar!</p>
                </div>
            ) : (
                <div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                    {carrito.map((item) => (
                        <li key={item.producto_id} style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            background: "rgba(255,255,255,0.7)", 
                            padding: "15px 20px", 
                            borderRadius: "12px", 
                            marginBottom: "10px",
                            border: "1px solid var(--pastel-blue)"
                        }}>
                            <div>
                                <h3 style={{ margin: 0, color: "#2c5282" }}>{item.nombre}</h3>
                                <p className="tech-font" style={{ margin: "5px 0 0 0", color: "var(--text-secondary)" }}>
                                    ${item.precio} x {item.cantidad}
                                </p>
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <span className="tech-font" style={{ fontWeight: "bold", fontSize: "1.1rem", color: "var(--pastel-purple)" }}>
                                    ${(item.precio * item.cantidad).toFixed(2)}
                                </span>
                                <button 
                                    className="btn-tech" 
                                    style={{ padding: "8px 12px", fontSize: "0.8rem", borderColor: "var(--error)", color: "var(--error)", boxShadow: "2px 2px 0 var(--error)" }}
                                    onClick={() => eliminarDelCarrito(item.producto_id)}
                                >
                                    Quitar
                                </button>
                            </div>
                        </li>
                    ))}
                    </ul>
                    
                    <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        marginTop: "30px", 
                        paddingTop: "20px", 
                        borderTop: "2px dashed var(--pastel-purple)" 
                    }}>
                        <h2 className="tech-font" style={{ margin: 0, color: "#2c5282" }}>Total:</h2>
                        <h2 className="tech-font" style={{ margin: 0, color: "var(--accent-hover)", fontSize: "2rem" }}>${total.toFixed(2)}</h2>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                        <button className="btn-tech btn-tech-primary" onClick={handleRealizarPedido}>
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
} 