import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useCart } from "@/context/hooks/use-cart";
import AddressService from "@/services/address-service";
import OrderService from "@/services/order-service";
import { IAddress } from "@/commons/types";
import './styles.css';

export const CheckoutSummaryPage = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const { cart, cartTotal, clearCart } = useCart();

    const [address, setAddress] = useState<IAddress | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [freightCost, setFreightCost] = useState<number>(0);
    const [deliveryDays, setDeliveryDays] = useState<string>("0");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSessionData();
    }, []);

    const loadSessionData = async () => {
        const addrData = sessionStorage.getItem('checkout_address_data');
        const addrId = sessionStorage.getItem('checkout_address_id');
        const payMethod = sessionStorage.getItem('checkout_payment_method');
        const freight = sessionStorage.getItem('checkout_freight');
        const days = sessionStorage.getItem('checkout_days');

        if (!payMethod) {
            navigate("/cart");
            return;
        }

        setPaymentMethod(payMethod);
        setFreightCost(parseFloat(freight || "0"));
        setDeliveryDays(days || "0");

        if (addrData) {
            try {
                const parsed = JSON.parse(addrData);
                setAddress(parsed);
                return;
            } catch (e) {
                console.error("Erro ao ler endereço", e);
            }
        }

        if (addrId) {
            try {
                const response = await AddressService.getMyAddresses();
                if (response.success && Array.isArray(response.data)) {
                    const found = response.data.find((a: IAddress) => a.id === parseInt(addrId));
                    if (found) setAddress(found);
                }
            } catch (error) {
                console.error("Erro ao buscar ID", error);
            }
        }
    };

    const handlePlaceOrder = async () => {
        if (!address) {
            toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Endereço inválido.' });
            return;
        }

        setLoading(true);

        const orderPayload = {
            data: new Date().toISOString(),
            address: address,
            items: cart.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                unit_price: item.product.price
            })),
            freight: freightCost,
            paymentMethod: paymentMethod
        };

        try {
            const response = await OrderService.save(orderPayload);

            if (response.success) {
                toast.current?.show({ severity: 'success', summary: 'Sucesso!', detail: 'Pedido realizado.', life: 2000 });
                setTimeout(() => {
                    clearCart();
                    sessionStorage.clear();
                    navigate("/my-orders");
                }, 1500);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao criar pedido.' });
                setLoading(false);
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro de conexão.' });
            setLoading(false);
        }
    };

    const translatePayment = (method: string) => {
        const map: Record<string, string> = {
            'PIX': 'PIX', 'CREDIT_CARD': 'Cartão de Crédito',
            'DEBIT_CARD': 'Cartão de Débito', 'BOLETO': 'Boleto Bancário'
        };
        return map[method] || method;
    };

    const finalTotal = cartTotal + freightCost;

    return (
        <div className="summary-container">
            <Toast ref={toast} />
            <div className="section-header">
                <h2><i className="pi pi-check-circle mr-2"></i> Resumo do Pedido</h2>
                <span className="divisor"></span>
            </div>

            <div className="summary-grid">
                <div className="left-column">
                    <div className="info-card">
                        <div className="info-header"><i className="pi pi-map-marker mr-2"></i> Endereço de Entrega</div>
                        <div className="info-content">
                            {address ? (
                                <>
                                    <p className="font-bold text-lg">{address.title || 'Principal'}</p>
                                    <p>{address.logradouro}, {address.numero}</p>
                                    <p>{address.bairro} - {address.city}/{address.estado}</p>
                                    <p>CEP: {address.cep}</p>
                                    <p className="text-green-700 text-sm mt-2 font-bold">Chega em até {deliveryDays} dias úteis</p>
                                </>
                            ) : <p>Carregando...</p>}
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-header"><i className="pi pi-wallet mr-2"></i> Forma de Pagamento</div>
                        <div className="info-content">
                            <p className="text-lg font-bold text-gray-800">{translatePayment(paymentMethod)}</p>
                        </div>
                    </div>
                    <div className="products-card">
                        {cart.map(item => {
                            // --- AQUI A CORREÇÃO: Ajusta o caminho da imagem ---
                            const imageUrl = item.product.image.startsWith('http') 
                                ? item.product.image 
                                : `http://localhost:8044${item.product.image}`;

                            return (
                                <div key={item.product.id} className="product-item">
                                    <img 
                                        src={imageUrl} 
                                        className="prod-img" 
                                        alt={item.product.name}
                                        onError={(e)=>e.currentTarget.src="https://placehold.co/60x60?text=..."} 
                                    />
                                    <div className="prod-details">
                                        <span className="prod-name">{item.product.name}</span>
                                        <span className="prod-qty">Qtd: {item.quantity}</span>
                                    </div>
                                    <div className="prod-price">{(item.product.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="right-column">
                    <div className="totals-card">
                        <h3 className="mb-4 text-xl font-bold">Valores</h3>
                        <div className="total-row"><span>Subtotal</span><span>{cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
                        <div className="total-row"><span>Frete</span><span>{freightCost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
                        <div className="total-row final"><span>Total</span><span>{finalTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></div>
                        <button className="btn-finish-order" onClick={handlePlaceOrder} disabled={loading} style={loading ? {opacity: 0.7} : {}}>
                            {loading ? 'Processando...' : 'Fazer Pedido'}
                        </button>
                        <button className="btn-back mt-3 w-full justify-content-center" onClick={() => navigate("/checkout/payment")} disabled={loading}>Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};