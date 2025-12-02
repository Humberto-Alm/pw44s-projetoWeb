import { Outlet, useNavigate, Link as RouterLink } from "react-router-dom";
import TopMenu from "@/components/top-menu"; 
import React, { useEffect, useState } from "react"; 
import CategoryService from "@/services/category-service"; 
import type { ICategory } from "@/commons/types"; 
import './styles.css';

const Underbar: React.FC = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            const response = await CategoryService.findAll();
            if (response.success && Array.isArray(response.data)) {
                setCategories(response.data as ICategory[]);
            }
        };
        loadCategories();
    }, []);

    const handleCategoryClick = (categoryId: number | null, categoryName: string) => {
        if (categoryId) {
            navigate(`/products?categoryId=${categoryId}&title=${categoryName}`);
        } else {
            navigate(`/products?title=Todos os Produtos`);
        }
    };

    return (
        <nav className="underbar-nav">
            <ul className="underbar-list">
                <li>
                    <span 
                        onClick={() => handleCategoryClick(null, 'Todos os Produtos')}
                        className="underbar-item-span"
                    >
                        Todos os Produtos
                    </span>
                </li>

                {categories.map((category) => (
                    <li key={category.id}>
                        <span 
                            onClick={() => handleCategoryClick(category.id!, category.name)}
                            className="underbar-item-span"
                        >
                            {category.name}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const Footer: React.FC = () => {
    const socialLinks = [
        { name: 'whatsapp', icon: 'pi pi-whatsapp', url: 'https://wa.me/559999999999' },
        { name: 'instagram', icon: 'pi pi-instagram', url: 'https://instagram.com/tabula' },
        { name: 'facebook', icon: 'pi pi-facebook', url: 'https://facebook.com/tabula' } 
    ];

    return (
        <footer className="layout-footer"> 
            <div className="footer-container"> 
                <div className="footer-column">
                    <h5 className="text-xl mb-1">Informações Institucionais</h5> 
                    <p className="text-base m-0">CNPJ: 00.623.904/0001-73</p>
                    <p className="text-base m-0">Inscrição: 123.45678-50</p>
                    <p className="text-base m-0">Endereço: Rua Ernesto Beuter - 53</p>
                </div>
                
                <div className="footer-column">
                    <h5 className="text-xl mb-1">Atendimento ao Cliente</h5> 
                    <p className="text-base m-0">E-mail: tabula.email@tabulairos.com</p>
                    <p className="text-base m-0">Telefone: +55 (99) 99999-9999</p>
                </div>
                
                <div className="footer-column">
                    <h5 className="text-xl mb-1">Privacidade</h5> 
                    <RouterLink 
                        to="/privacy-policy" 
                        className="footer-link-privacy"
                    >
                        Nossa Política de Privacidade
                    </RouterLink>
                </div>
            </div>
            
            <div className="footer-social"> 
                {socialLinks.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="no-underline">
                        <i className={`${link.icon}`} style={{ fontSize: '1.8rem', color: 'whitesmoke' }} /> 
                    </a>
                ))}
            </div>
            
            <div className="footer-copyright"> 
                © {new Date().getFullYear()} Tabula. Todos os direitos reservados.
            </div>
        </footer>
    );
};

export function Layout() {
    return (
        <div className="flex flex-column min-h-screen">
            <div className="layout-fixed-header">
                <TopMenu />
                <Underbar />
            </div>
            
            <main className="layout-main-content"> 
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
}