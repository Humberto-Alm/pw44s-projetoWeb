import React from 'react'; // Adicionado para garantir que o React.MouseEvent funcione
import { IProduct } from "@/commons/types";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/hooks/use-cart";
import './styles.css';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct) => void; 
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleDetailsClick = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão abra os detalhes do produto
    
    addItem(product, 1);
    
    onAddToCart(product);
  };

  // --- LÓGICA IMPORTANTE DA IMAGEM ---
  // Se a imagem vier do banco como "/mage/nome.jpg", adicionamos o servidor antes.
  // Se vier da web (http...), usamos direto.
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `http://localhost:8044${product.image}`;

  return (
    <div className="product-card-custom"> 
      
      {/* Área clicável que leva aos detalhes */}
      <div onClick={handleDetailsClick} className="card-link cursor-pointer">
        <img
            alt={product.name}
            src={imageUrl} 
            className="product-image"
            // Fallback: se a imagem não carregar, mostra um cinza com texto
            onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=Sem+Imagem")}
        />
        <h3 className="Titulo">
            {product.name}
        </h3>
      </div>
      
      <div className="separator"></div>
      
      <p className="preco">
        {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>

      <button 
        className="carrinho"
        onClick={handleAddToCart}
      >
        <i className="pi pi-plus"></i> 
        <span>Adicionar</span>
      </button>

    </div>
  );
};