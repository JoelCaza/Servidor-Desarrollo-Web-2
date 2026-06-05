import { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";


export const Categorias = () => {
    const [categorias, setCategoria] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");

    const obtenerCategorias = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/categorias/obtenerCategorias`);
            const data = await res.json();
            if (res.ok) {
                setCategoria(data.categorias);
                console.log(data.categorias);


            } else {
                console.error("Error al cargar categorias", data.error);

            }

        } catch (error) {
            console.log("Error en el servidor", error);
        }


    };

    useEffect(() => {
        obtenerCategorias();
    }, []);


    const handleCrear = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/categorias/crearCategoria`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ nombre: nuevaCategoria })
                });
            const data = await res.json();
            if (res.ok) {
                console.log("Categoria creada existosamente");
                obtenerCategorias();
            }else{
                console.log("Error al crear categoria",data.error);
            }


        }catch(error){
            console.error("Error en el servidor",error);
        }

    }
     const handleEliminar = async (id) => {
        if(!window.confirm("Estas seguro de eliminar esta categoria")) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/categorias/eliminarCategoria/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ nombre: nuevaCategoria })
                });
            const data = await res.json();
            if (res.ok) {
                console.log("Categoria Eliminada");
                obtenerCategorias();
            }else{
                console.log("Error al crear categoria",data.error);
            }


        }catch(error){
            console.error("Error en el servidor",error);
        }

    }


    return (
        <div className="glass-container">
            <h1 className="page-title">Categorías</h1>
            <div style={{ marginBottom: "40px", background: "rgba(255,255,255,0.4)", padding: "20px", borderRadius: "16px", border: "1px dashed var(--pastel-blue)" }}>
                <form onSubmit={handleCrear} style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
                    <div style={{ flex: 1 }}>
                        <label className="tech-font" style={{ display: "block", marginBottom: "8px", color: "#2c5282", fontSize: "0.85rem" }}>Nombre de la categoría:</label>
                        <input className="input-tech" type="text"
                        value={nuevaCategoria}
                        onChange={(e) => setNuevaCategoria(e.target.value)}
                        required
                        />
                    </div>
                    <button className="btn-tech btn-tech-primary" type="submit">Guardar</button>
                </form>
            </div>

            <h3 className="tech-font" style={{ color: "#2c5282", marginBottom: "20px" }}>Listado de Categorías</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                {categorias.map((cat) => (
                    <li key={cat.id} style={{ 
                        background: "var(--card-bg)", 
                        border: "1px solid var(--pastel-purple)", 
                        borderRadius: "12px", 
                        padding: "15px 20px", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        boxShadow: "0 4px 10px rgba(214, 188, 250, 0.2)",
                        transition: "transform 0.2s"
                    }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                        <h3 style={{ margin: 0, color: "#2d3748", fontSize: "1.1rem" }}>{cat.nombre}</h3>
                        <button 
                        className="btn-tech"
                        style={{ padding: "6px 12px", fontSize: "0.75rem", borderColor: "var(--error)", color: "var(--error)", boxShadow: "2px 2px 0 var(--error)" }}
                        onClick={() => handleEliminar(cat.id)}
                        >ELIMINAR</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}