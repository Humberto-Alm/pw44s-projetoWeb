import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import './styles.css';

type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'BOLETO';

export const CheckoutPaymentPage = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

    const handleContinue = () => {
        if (!selectedMethod) {
            toast.current?.show({ severity: 'warn', summary: 'Atenção', detail: 'Selecione uma forma de pagamento.' });
            return;
        }
        sessionStorage.setItem('checkout_payment_method', selectedMethod);
        navigate("/checkout/summary");
    };

    return (
        <div className="payment-container">
            <Toast ref={toast} />

            <div className="section-header">
                <h2><i className="pi pi-wallet mr-2"></i> Forma de Pagamento</h2>
                <span className="divisor"></span>
            </div>

            <div className="payment-box">
                <div className="payment-options">
                    
                    <div 
                        className={`payment-card ${selectedMethod === 'PIX' ? 'selected' : ''}`}
                        onClick={() => setSelectedMethod('PIX')}
                    >
                        <div className="radio-check"></div>
                        <i className="fa-brands fa-pix payment-icon" style={{color: '#32bcad'}}></i>
                        <div className="payment-title">PIX</div>
                        <p className="payment-desc">Aprovação imediata.</p>
                    </div>

                    <div 
                        className={`payment-card ${selectedMethod === 'CREDIT_CARD' ? 'selected' : ''}`}
                        onClick={() => setSelectedMethod('CREDIT_CARD')}
                    >
                        <div className="radio-check"></div>
                        <i className="pi pi-credit-card payment-icon"></i>
                        <div className="payment-title">Cartão de Crédito</div>
                        <p className="payment-desc">Em até 12x sem juros.</p>
                    </div>

                    <div 
                        className={`payment-card ${selectedMethod === 'DEBIT_CARD' ? 'selected' : ''}`}
                        onClick={() => setSelectedMethod('DEBIT_CARD')}
                    >
                        <div className="radio-check"></div>
                        <i className="pi pi-credit-card payment-icon"></i>
                        <div className="payment-title">Cartão de Débito</div>
                        <p className="payment-desc">À vista.</p>
                    </div>

                    <div 
                        className={`payment-card ${selectedMethod === 'BOLETO' ? 'selected' : ''}`}
                        onClick={() => setSelectedMethod('BOLETO')}
                    >
                        <div className="radio-check"></div>
                        <i className="fa-solid fa-barcode payment-icon"></i>
                        <div className="payment-title">Boleto Bancário</div>
                        <p className="payment-desc">Vencimento em 3 dias.</p>
                    </div>
                </div>

                <div className="actions-bar">
                    <button className="btn-back" onClick={() => navigate("/checkout/address")}>
                        <i className="pi pi-arrow-left"></i> Voltar
                    </button>

                    <button 
                        className="btn-continue" 
                        onClick={handleContinue}
                        disabled={!selectedMethod}
                    >
                        Continuar <i className="pi pi-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};