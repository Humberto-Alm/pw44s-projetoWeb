import { useCart } from "@/context/hooks/use-cart";
import { useAuth } from "@/context/hooks/use-auth";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputNumber } from "primereact/inputnumber";
import { useNavigate } from "react-router-dom";
import type { ICartItem } from "@/commons/types";
import './styles.css';

export const CartPage = () => {
    const navigate = useNavigate();
    const { cart, cartTotal, updateQuantity, removeItem, clearCart, cartCount } = useCart();
    const { authenticated } = useAuth(); 
    
    const finalTotal = cartTotal; 
   
    const productColumnTemplate = (item: ICartItem) => {
        const imageUrl = item.product.image.startsWith('http') 
            ? item.product.image 
            : `http://localhost:8044${item.product.image}`;

        return (
            <div className="flex align-items-center gap-3">
                <img 
                    src={imageUrl || "https://placehold.co/100x100?text=Sem+Imagem"} 
                    alt={item.product.name} 
                    className="cart-product-image"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/100x100?text=Erro")}
                />
                <div className="flex flex-column">
                    <span className="font-bold text-lg text-900">{item.product.name}</span>
                    <span className="text-sm text-500">{item.product.category?.name || 'Geral'}</span>
                </div>
            </div>
        );
    };

    const priceColumnTemplate = (item: ICartItem) => (
        <span className="font-medium text-lg">
            {item.product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
    );
    
    const quantityColumnTemplate = (item: ICartItem) => (
        <div className="flex align-items-center gap-2">
            <InputNumber
                value={item.quantity}
                onValueChange={(e) => updateQuantity(item.product.id!, e.value ?? 1)}
                showButtons
                buttonLayout="horizontal"
                min={1}
                max={99}
                inputStyle={{ width: '3rem', textAlign: 'center' }}
                className="cart-quantity-input" 
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text"
                onClick={() => removeItem(item.product.id!)}
                tooltip="Remover item"
            />
        </div>
    );

    const handleCheckout = () => {
        if (authenticated) {
            navigate("/checkout/address");
        } else {
            navigate("/login", { 
                state: { from: { pathname: "/checkout/address" } } 
            });
        }
    };

    if (cartCount === 0) {
        return (
            <div className="container mx-auto px-4 pt-4 text-center cart-container">
                <i className="pi pi-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <h2 className="text-3xl font-bold text-900 mb-2 cart-title">Seu carrinho está vazio</h2>
                <p className="text-gray-600 mb-6">Parece que você ainda não adicionou nenhum jogo.</p>
                <Button 
                    label="Começar a Comprar" 
                    icon="pi pi-arrow-left" 
                    onClick={() => navigate("/")} 
                    className="btn-start-shopping" 
                />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 pt-1 pb-8 cart-container">
            <h2 className="text-3xl font-bold mb-6 cart-title">Meu Carrinho ({cartCount} itens)</h2>

            <div className="grid">
                
                <div className="col-12 lg:col-8">
                    <div className="card shadow-1 border-round-xl overflow-hidden bg-white">
                        <DataTable value={cart} className="p-datatable-lg" stripedRows responsiveLayout="scroll">
                            <Column header="Produto" body={productColumnTemplate} style={{ width: '55%' }} />
                            <Column header="Preço" body={priceColumnTemplate} style={{ width: '20%' }} />
                            <Column header="Quantidade" body={quantityColumnTemplate} style={{ width: '25%' }} />
                        </DataTable>
                    </div>
                    
                    <div className="flex justify-content-between align-items-center mt-4">
                        <Button 
                            label="Continuar Comprando" 
                            icon="pi pi-arrow-left" 
                            onClick={() => navigate("/products")} 
                            className="btn-continue-shopping"
                        />
                        
                        <Button 
                            label="Limpar Carrinho" 
                            icon="pi pi-trash" 
                            onClick={clearCart} 
                            className="p-button-text p-button-danger btn-clear-cart"
                        />
                    </div>
                </div>

                <div className="col-12 lg:col-4">
                    <div className="summary-card">
                        <h3 className="text-xl font-bold mb-4 text-900">Resumo da Compra</h3>
                        
                        <div className="flex justify-content-between mb-3">
                            <span className="text-600">Subtotal</span>
                            <span className="font-bold text-900">
                                {cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                        </div>
                        
                        <div className="flex justify-content-between mb-3 align-items-center">
                            <span className="text-600">Frete</span>
                            <span className="freight-badge">
                                + frete
                            </span>
                        </div>

                        <div className="border-top-1 border-gray-200 my-3"></div>

                        <div className="flex justify-content-between align-items-end mb-5">
                            <span className="text-xl font-bold text-900">Total</span>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-900 block">
                                    {finalTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </span>
                            </div>
                        </div>

                        <Button 
                            label="Finalizar" 
                            icon="pi pi-check" 
                            onClick={handleCheckout} 
                            className="btn-finalize"
                        />
                        
                        <div className="security-text">
                            <i className="pi pi-lock mr-1"></i> Compra 100% Segura
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};