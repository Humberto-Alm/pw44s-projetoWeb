import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"; // <--- 1. IMPORT NOVO
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/hooks/use-auth";
import { Badge } from 'primereact/badge';
import { useCart } from "@/context/hooks/use-cart"; 
import './styles.css';

const TopMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authenticated, handleLogout, authenticatedUser } = useAuth();
    const { cartCount } = useCart(); 
    
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogoutClick = () => {
        setShowUserMenu(false);
        handleLogout();
        navigate("/"); 
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const firstName = authenticatedUser?.displayName?.split(' ')[0] || 'Usuário';

    return (
        <header className="top-menu-header">
            {/* 1. LOGO */}
            <h1 className="top-menu-logo">
                <Link to="/" className="top-menu-logo-link">Tabula</Link>
            </h1>

            {/* 2. BARRA DE PESQUISA (NOVO - ADICIONADO AQUI) */}
            <div className="search-container">
                <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText 
                        placeholder="O que você está procurando?" 
                        className="w-full p-inputtext-sm" 
                        style={{ borderRadius: '2rem' }} 
                    />
                </span>
            </div>

            {/* 3. NAVEGAÇÃO (CARRINHO + USER) */}
            <nav className="top-menu-nav">
                
                <div className="top-menu-cart-container mr-4">
                    <Button 
                        icon="pi pi-shopping-cart" 
                        className="p-button-rounded p-button-text top-menu-cart-button" 
                        onClick={() => navigate("/cart")} 
                        tooltip="Meu Carrinho"
                    />
                    {cartCount > 0 && ( 
                        <Badge value={cartCount} severity="danger" className="top-menu-cart-badge" />
                    )}
                </div>

                {authenticated ? (
                    <div className="user-menu-container" ref={menuRef}>
                        <div 
                            className="user-profile-trigger"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <i className="pi pi-user text-xl"></i>
                            <span className="user-name">{firstName}</span>
                            <i className={`pi pi-angle-${showUserMenu ? 'up' : 'down'} ml-1 text-xs`}></i>
                        </div>

                        {showUserMenu && (
                            <div className="user-dropdown-menu">
                                <div className="dropdown-header">
                                    Olá, <strong>{firstName}</strong>
                                </div>
                                <ul className="dropdown-list">
                                    <li onClick={() => { navigate("/my-orders"); setShowUserMenu(false); }}>
                                        <i className="pi pi-box"></i> Meus Pedidos
                                    </li>
                                    <li onClick={handleLogoutClick} className="logout-item">
                                        <i className="pi pi-sign-out"></i> Sair da Conta
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="auth-buttons-container">
                        <Link to="/login" state={{ from: location }} className="auth-btn-link">Entrar</Link>
                        <span className="divider">/</span>
                        <Link to="/register" state={{ from: location }} className="auth-btn-link">Cadastrar-se</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default TopMenu;