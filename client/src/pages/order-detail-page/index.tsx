import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "@/services/order-service";
import { IOrder } from "@/commons/types";
import { Button } from "primereact/button";
import './styles.css';

export const OrderDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(id) loadOrder(parseInt(id));
    }, [id]);

    const loadOrder = async (orderId: number) => {
        setLoading(true);
        const response = await OrderService.findById(orderId);
        if (response.success && response.data) {
            setOrder(response.data as IOrder);
        }
        setLoading(false);
    };

    const getSubtotal = () => {
        if(!order?.items) return 0;
        return order.items.reduce((acc, item) => acc + (item.unit_price * item.quantity), 0);
    };

    const translatePayment = (method?: string) => {
        if (!method) return 'Não informado';
        const map: Record<string, string> = {
            'PIX': 'PIX', 'CREDIT_CARD': 'Cartão de Crédito',
            'DEBIT_CARD': 'Cartão de Débito', 'BOLETO': 'Boleto Bancário'
        };
        return map[method] || method;
    };

    if (loading) return <div className="text-center p-5">Carregando...</div>;
    if (!order) return <div className="text-center p-5">Pedido não encontrado.</div>;

    return (
        <div className="order-detail-container">
            <Button
                label="Voltar"
                icon="pi pi-arrow-left"
                onClick={() => navigate("/my-orders")} 
                className="p-button-rounded btn-back-red" 
            />
            <div className="detail-header">
                <h2>Pedido #{order.id}</h2>
                <span className="status-tag">Realizado em {new Date(order.data).toLocaleDateString()}</span>
            </div>

            <div className="detail-grid">
                <div className="detail-card products">
                    <h3>Itens do Pedido</h3>
                    {order.items?.map((item) => {
                        // --- AQUI A CORREÇÃO DA IMAGEM ---
                        const imageUrl = item.product.image.startsWith('http') 
                            ? item.product.image 
                            : `http://localhost:8044${item.product.image}`;

                        return (
                            <div key={item.id} className="item-row">
                                <img 
                                    src={imageUrl} 
                                    className="item-img" 
                                    alt={item.product.name}
                                    onError={(e) => e.currentTarget.src="https://placehold.co/60x60?text=..."} 
                                />
                                <div className="item-info">
                                    <span>{item.product.name}</span>
                                    <small>Qtd: {item.quantity}</small>
                                </div>
                                <div className="item-price">{item.unit_price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="side-column">
                    <div className="detail-card">
                        <h3>Endereço de Entrega</h3>
                        <p>{order.address?.logradouro}, {order.address?.numero}</p>
                        <p>{order.address?.bairro} - {order.address?.city}/{order.address?.estado || 'UF'}</p>
                        <p>CEP: {order.address?.cep}</p>
                        <div className="mt-3 pt-2 border-top-1 border-gray-200">
                            <strong>Forma de Pagamento:</strong>
                            <p>{translatePayment(order.paymentMethod)}</p>
                        </div>
                    </div>

                    <div className="detail-card totals">
                        <h3>Resumo</h3>
                        <div className="total-line">
                            <span>Subtotal</span>
                            <span>{getSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <div className="total-line">
                            <span>Frete</span>
                            <span>{(order.freight || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                        <div className="total-line total-final">
                            <span>Total</span>
                            <span>{order.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};