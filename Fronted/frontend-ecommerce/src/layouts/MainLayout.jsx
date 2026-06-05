import {Outlet,Link,useLocation} from "react-router-dom";
import { ContextCart } from "../services/ContextCart";
import { useContext } from "react";
import { ChatBot } from "../pages/Chatbot";
import "../App.css";

export const MainLayout = () => {
    const {carrito} = useContext(ContextCart);
    const cantidadItems = carrito.reduce((acc,item) => acc + item.cantidad,0);
    const location = useLocation();

    return (
    <div className="main-layout">
        <nav className="glass-nav">
            <h2 className="brand-logo">TECH<span className="pastel-accent">CART</span></h2>
            <div className="nav-links">
                <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
                <Link to="/contacto" className={location.pathname === "/contacto" ? "active" : ""}>Contacto</Link>
                <Link to="/productos" className={location.pathname === "/productos" ? "active" : ""}>Productos</Link>
                <Link to="/categorias" className={location.pathname === "/categorias" ? "active" : ""}>Categorias</Link>
                <Link to="/adminProductos" className={location.pathname === "/adminProductos" ? "active" : ""}>Crud</Link>
                <Link to="/carrito" className={location.pathname === "/carrito" ? "active cart-link" : "cart-link"}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span className="cart-badge">{cantidadItems}</span>
                </Link>
            </div>
        </nav>
        <main className="content-wrapper">
            <Outlet />
        </main>
        <ChatBot />
    </div>
    )
}