import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css"; // Reuse login styles

export const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el registro de usuarios
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Registro exitoso");
};
return (
    <div className="login-container">
        <div className="overlay"></div>
        <div className="login-card">
            <header className="login-header">
                <h1>Nuevo Usuario</h1>
                <p>Terminal de Registro</p>
            </header>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre / Alias</label>
                    <input 
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        className="login-input"
                        placeholder="John Doe"
                    />
                </div>
                <div className="form-group">
                    <label>Identificador / Email</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        placeholder="user@techcart.io"
                    />
                </div>
                <div className="form-group">
                    <label>Protocolo / Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        placeholder="••••••••"
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: "10px" }}>
                    Registrar
                </button>
                
                <div className="divider">
                    <span>¿Ya tienes cuenta?</span>
                </div>
                
                <Link to="/Login" style={{ textDecoration: 'none' }}>
                    <button type="button" className="btn btn-secondary">
                        Iniciar Sesión
                    </button>
                </Link>
                <Link to="/" className="back-link">
                    [ Regresar al Sistema ]
                </Link>
            </form>
        </div>
    </div>
)
}

