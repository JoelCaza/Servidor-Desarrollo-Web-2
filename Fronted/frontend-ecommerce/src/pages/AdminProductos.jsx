import { useState, useEffect } from "react"

export const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategoria] = useState([]);
    const [mensaje,setMensaje]=useState("");

    const [form,setForm] = useState({
        categoria_id :"",
        nombre:"",
        descripcion:"",
        precio:"",
        stock:""
        });
    
    const [editandoId,setEditandoId]=useState(null);

    useEffect(() => {
        listarProductos();
        obtenerCategorias();
    }, []);
    const listarProductos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/productos`);
            const data = await response.json();
            setProductos(data.productos);
            console.log("Productos obtenidos:", data.productos);
        } catch (error) {
            console.error("Error fetching productos:", error);
        }
    };
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        const metodo = editandoId ? "PUT" : "POST";
        const url = editandoId
        ? `${import.meta.env.VITE_PUBLIC_URL}/productos/${editandoId}`
        : `${import.meta.env.VITE_PUBLIC_URL}/productos/`
        const token = localStorage.getItem("token");

        try{
            const res = await fetch(url,{
                method:metodo,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(form)
            });
            const data = await res.json();

            if(res.ok){
                setMensaje(`Producto ${editandoId} ? 'actualizado' : 'creado'} con exito `);
                setForm({ categoria_id :"",nombre:"", descripcion:"", precio:"", stock:""});
                setEditandoId(null);
                listarProductos();
            }else{
                setMensaje("Error"+data.error);
            }

        }catch(error){
            console.error("error guardando producto",error);
            setMensaje("Error de conexion al guardar");

        }

    };

    const handleEditar = (prod) => {
        setEditandoId(prod.id);
        const CategoriaEncontrada = categorias.find(c => c.nombre === prod.categoria);

        setForm({
            categoria_id: CategoriaEncontrada ? CategoriaEncontrada.id : "",
            nombre:prod.nombre,
            descripcion:prod.descripcion,
            precio:prod.precio,
            stock:prod.stock
        });
    };

    const handleEliminar = async (id) =>{
        if(!window.confirm("Seguro que deseas eliminar este prodicto")) return;

        try{
             const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/productos/${id}`,{
                method:"DELETE"
             });
            
             if(res.ok){
                setMensaje("Producto Eliminado");
                listarProductos();
             }
             else{
                const data = await res.json();
                setMensaje("Error" + data.error);
             }

        }catch(error){
            console.error("Error al eliminar",error);
        }
    };



    return (
        <div className="glass-container">
            <h1 className="page-title">Gestion De Productos</h1>
            {mensaje && <p className="tech-font" style={{ color: "var(--pastel-pink)", fontWeight: "bold", textAlign: "center" }}>{mensaje}</p>}
          

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "40px" }}>
              <select className="input-tech" name="categoria_id" value={form.categoria_id} onChange={handleChange} required>
                <option value="">------Selecciona una Categoria---------</option>
                {categorias.map (cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
            </select>

            <input className="input-tech" type="text" name="nombre" placeholder="Nombre del Producto" value={form.nombre} onChange={handleChange}  required/>
            <input className="input-tech" type="text" name="descripcion" placeholder="Ingresa la Descripcion" value={form.descripcion} onChange={handleChange} required/>
            <div style={{ display: "flex", gap: "15px" }}>
                <input className="input-tech" type="number" name="precio" step="0.01" placeholder="Ingresa el precio" value={form.precio} onChange={handleChange} required/>
                <input className="input-tech" type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required/>
            </div>

            <button type="submit" className="btn-tech btn-tech-primary" style={{ alignSelf: "flex-end" }}>
                {editandoId ? "Actualizar Producto" : "Guardar Producto"}
            </button>

            </form>

            <h2 className="tech-font" style={{ color: "#2c5282", marginBottom: "15px" }}>Listado de Productos</h2>
            <div style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((prod) => (
                        <tr key={prod.id}>
                             <td><strong>{prod.nombre}</strong></td>
                            <td><span style={{ background: "rgba(255,255,255,0.6)", padding: "4px 8px", borderRadius: "8px", fontSize: "0.85rem" }}>{prod.categoria}</span></td>
                            <td className="tech-font">{prod.stock}</td>
                            <td>
                             <div style={{ display: "flex", gap: "10px" }}>
                                 <button className="btn-tech" style={{ padding: "6px 12px", fontSize: "0.75rem", borderColor: "var(--pastel-blue)" }} onClick={() => handleEditar(prod)}>
                                    Editar
                                 </button>
                                 <button className="btn-tech" style={{ padding: "6px 12px", fontSize: "0.75rem", borderColor: "var(--error)", color: "var(--error)", boxShadow: "2px 2px 0 var(--error)" }} onClick={() => handleEliminar(prod.id)}>
                                    Eliminar
                                 </button>
                             </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}