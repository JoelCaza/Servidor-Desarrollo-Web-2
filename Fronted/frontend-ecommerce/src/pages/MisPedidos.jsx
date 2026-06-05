import { useState, useEffect } from "react";

export const MisPedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    const obtenerPedidos = async () => {

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/pedidos/obtenerPedidos`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                });
            const data = await res.json();
            setPedidos(data.data);
            console.log(data.data);

        } catch (error) {
            console.log("Error en el servidor", error);
        }
    };
    useEffect(() => {
        obtenerPedidos();
    }, []);

    return (
        <div className="glass-container">
            <h1 className="page-title">Tu Lista de Pedidos</h1>

            <div style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos && pedidos.length > 0 ? pedidos.map(p => (
                            <tr key={p.id}>
                                <td className="tech-font" style={{ color: "var(--pastel-purple)", fontWeight: "bold" }}>#{p.id}</td>
                                <td className="tech-font">${p.total}</td>
                                <td>
                                    <span style={{
                                        background: p.estado === 'Completado' ? "var(--pastel-green)" : "var(--pastel-blue)",
                                        color: p.estado === 'Completado' ? "#22543d" : "#2c5282",
                                        padding: "4px 10px",
                                        borderRadius: "12px",
                                        fontSize: "0.85rem",
                                        fontWeight: "bold"
                                    }}>
                                        {p.estado}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>No tienes pedidos registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}