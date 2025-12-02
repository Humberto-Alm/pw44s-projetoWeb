import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "@/services/order-service";
import { IOrder } from "@/commons/types";
import { Button } from "primereact/button";
import './styles.css';

export const MyOrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await OrderService.getMyOrders();
            if (response.success && Array.isArray(response.data)) {
                const sorted = (response.data as IOrder[]).sort((a, b) => b.id - a.id);
                setOrders(sorted);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error("Erro ao carregar pedidos", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="orders-container">
            <h2 className="page-title"><i className="pi pi-box mr-2"></i> Meus Pedidos</h2>
            <div className="divider"></div>

            {loading ? (
                <div className="text-center p-5">
                    <i className="pi pi-spin pi-spinner text-4xl" style={{ color: '#800000' }}></i>
                </div>
            ) : orders.length === 0 ? (
                <div className="empty-orders">
                    <i className="pi pi-shopping-bag text-6xl mb-3 text-gray-300"></i>
                    <p>Você ainda não fez nenhum pedido.</p>
                    
                    <Button 
                        label="Ir para a Loja" 
                        className="mt-3" 
                        style={{ 
                            backgroundColor: '#800000', 
                            border: 'none', 
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            color: 'white' // Garante texto branco
                        }}
                        onClick={() => navigate("/")} 
                    />
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div 
                            key={order.id} 
                            className="order-card" 
                            onClick={() => navigate(`/my-orders/${order.id}`)}
                        >
                            <div className="order-header">
                                <span className="order-number">Pedido #{order.id}</span>
                                <span className="order-date">{formatDate(order.data)}</span>
                            </div>
                            
                            <div className="order-body">
                                <div className="order-status">
                                    <span className="status-badge success">Realizado</span>
                                </div>

                                {/* --- AQUI ESTÁ A ÚNICA ADIÇÃO: IMAGENS DOS PRODUTOS --- */}
                                <div style={{ display: 'flex', gap: '8px', margin: '12px 0', overflowX: 'auto' }}>
                                    {order.items?.map((item: any, idx: number) => {
                                        // Lógica para corrigir a URL da imagem
                                        const rawImg = item.product?.image || "";
                                        const imgUrl = rawImg.startsWith('http') 
                                            ? rawImg 
                                            : `http://localhost:8044${rawImg}`;

                                        return (
                                            <img 
                                                key={idx}
                                                src={imgUrl}
                                                alt={item.product?.name}
                                                style={{ 
                                                    width: '50px', 
                                                    height: '50px', 
                                                    objectFit: 'cover', 
                                                    borderRadius: '4px',
                                                    border: '1px solid #e0e0e0',
                                                    backgroundColor: '#fff'
                                                }}
                                                onError={(e) => e.currentTarget.src = "https://placehold.co/50x50?text=..."}
                                            />
                                        );
                                    })}
                                </div>
                                {/* --------------------------------------------------- */}

                                <div className="order-total">
                                    <small>Total:</small>
                                    <strong>
                                        {(order.total || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </strong>
                                </div>
                            </div>
                            
                            <div className="order-footer">
                                <span>{order.items?.length || 0} produtos</span>
                                <span className="details-link">
                                    Ver Detalhes <i className="pi pi-chevron-right" style={{ fontSize: '0.8rem' }}></i>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};