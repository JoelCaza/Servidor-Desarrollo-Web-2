import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensajeExitoso, setMensajeExitoso] = useState("");
    const [mensajeIncorrecto, setMensajeIncorrecto] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensajeExitoso("");
        setMensajeIncorrecto("");
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                setMensajeExitoso("ACCESO CONCEDIDO");
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                setMensajeIncorrecto("ERROR DE AUTENTICACIÓN");
            }
        } catch (error) {
            setMensajeIncorrecto("ERROR DE SISTEMA");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="overlay"></div>

            <div className="login-card">
                <header className="login-header">
                    <h1>Tech Auth</h1>
                    <p>Terminal de Acceso Seguro</p>
                </header>

                {mensajeExitoso && (
                    <div className="message success">
                        {mensajeExitoso}
                    </div>
                )}
                
                {mensajeIncorrecto && (
                    <div className="message error">
                        {mensajeIncorrecto}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Identificador / Email</label>
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            placeholder="admin@tech.com"
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

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Sincronizando..." : "Iniciar Sesión"}
                    </button>

                    <div className="divider">
                        <span>Registro de Usuario</span>
                    </div>

                    <Link to="/Register" style={{ textDecoration: 'none' }}>
                        <button type="button" className="btn btn-secondary">
                            Crear Nueva Cuenta
                        </button>
                    </Link>

                    <Link to="/" className="back-link">
                        [ Regresar al Sistema ]
                    </Link>
                </form>
            </div>
        </div>
    );
};

  
