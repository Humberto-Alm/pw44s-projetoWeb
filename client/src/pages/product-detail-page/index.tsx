import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Toast } from "primereact/toast";
import { InputNumber } from 'primereact/inputnumber'; 
import { Button } from "primereact/button";
import { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { useCart } from "@/context/hooks/use-cart";
import './styles.css';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { findById } = ProductService;
  const { addItem } = useCart();

  const fallbackImage = "https://placehold.co/600x400?text=Sem+Imagem";

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await findById(parseInt(id)); 
        if (response.success && response.data) {
          const loadedProduct = response.data as IProduct;
          setProduct(loadedProduct);
          setSelectedImage(loadedProduct.image || fallbackImage);
        } else {
          navigate("/products");
        }
      } catch (error) {
        console.error(error);
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]); 

  const getFullImageUrl = (path: string | undefined) => {
    if (!path) return "https://placehold.co/600x400?text=Sem+Imagem";
    if (path.startsWith('http')) return path;
    return `http://localhost:8044${path}`;
  };
  
  const handleAddToCart = () => {
    if (product) {
        addItem(product, quantity);
        toast.current?.show({ 
            severity: 'success', 
            summary: 'Sucesso', 
            detail: `${quantity}x ${product.name} adicionado ao carrinho.`, 
            life: 3000 
        });
        setQuantity(1);
    }
  };

  const handleGoBack = () => {
      navigate(-1); 
  };

  if (loading) {
    return (
        <div className="flex justify-content-center align-items-center min-h-screen">
            <i className="pi pi-spin pi-spinner text-4xl" style={{color: '#5c0000'}}></i>
        </div>
    );
  }

  if (!product) return <div className="text-center mt-5"><h3>Produto não encontrado.</h3></div>;

  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);

  return (
    <div className="product-detail-container">
      <Toast ref={toast} />
      
      <div className="detail-block top-block"> 
        <div className="gallery-column">
            <div className="main-image-wrapper">
                <img 
                    src={getFullImageUrl(selectedImage)} 
                    alt={product.name} 
                    className="main-image"
                    onError={(e) => (e.currentTarget.src = fallbackImage)}
                />
            </div>
            {allImages.length > 0 && (
                <div className="thumbnails-row">
                    {allImages.map((imgSrc, index) => (
                        <img 
                            key={index}
                            src={getFullImageUrl(imgSrc)} 
                            alt={`Miniatura ${index}`}
                            className={`thumbnail-image ${selectedImage === imgSrc ? 'active' : ''}`}
                            onClick={() => setSelectedImage(imgSrc!)}
                            onError={(e) => (e.currentTarget.src = fallbackImage)}
                        />
                    ))}
                </div>
            )}
        </div>

        <div className="info-column">
            <h1 className="product-name">{product.name}</h1>
    
            <ul className="info-list">
                {product.specifications && product.specifications.length > 0 ? (
                    product.specifications.map((spec, i) => (
                        <li key={i}>{spec}</li>
                    ))
                ) : (
                    <li>Sem especificações adicionais.</li>
                )}
            </ul>

            <div className="price-tag">
                {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            
            <div className="installment-tag">
                {product.installmentInfo || "Em até 12x sem juros"}
            </div>

            <div className="purchase-area">
                <div className="qty-wrapper">
                    <label htmlFor="qtd">Quantidade:</label>
                    <InputNumber 
                        id="qtd"
                        value={quantity} 
                        onValueChange={(e) => setQuantity(e.value ?? 1)} 
                        showButtons 
                        buttonLayout="horizontal"
                        step={1}
                        min={1} 
                        max={99} 
                        inputStyle={{ width: '4rem', textAlign: 'center' }}
                        decrementButtonClassName="p-button-secondary"
                        incrementButtonClassName="p-button-secondary"
                    />
                </div>

                <Button 
                    label="Adicionar ao Carrinho"
                    icon="pi pi-shopping-cart"
                    className="action-btn add-btn"
                    onClick={handleAddToCart}
                />
                
                <Button 
                    label="Voltar" 
                    icon="pi pi-arrow-left" 
                    className="action-btn back-btn" 
                    onClick={handleGoBack}
                />
            </div>
        </div>
      </div>

      <div className="detail-block bottom-block">
        <h3 className="desc-title">Descrição</h3>
        <p className="desc-text">
            {product.description || "Descrição não informada pelo fabricante."}
        </p>
      </div>
    </div>
  );
};