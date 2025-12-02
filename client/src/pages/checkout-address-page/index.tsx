import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import AddressService from "@/services/address-service";
import { useCart } from "@/context/hooks/use-cart";
import { IAddress } from "@/commons/types";
import './styles.css';

const NEW_ADDRESS_ID = 0;

export const CheckoutAddressPage = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const { cartTotal } = useCart();

    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [freightCost, setFreightCost] = useState<number>(0);
    const [deliveryDays, setDeliveryDays] = useState<number>(0);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const [newAddress, setNewAddress] = useState({
        title: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        city: "",    
        estado: ""
    });

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        const response = await AddressService.getMyAddresses();
        if (response.success && Array.isArray(response.data)) {
            setAddresses(response.data);
        }
    };

    const updateFreight = async (cep: string) => {
        if (cep && cep.length >= 8) {
            const result = await AddressService.calculateFreight(cep, cartTotal);
            setFreightCost(result.value);
            setDeliveryDays(result.deliveryDays);
        } else {
            setFreightCost(0);
            setDeliveryDays(0);
        }
    };

    const handleCepBlur = async () => {
        const cleanCep = newAddress.cep.replace(/\D/g, '');
        if (cleanCep.length >= 8) {
            const response = await AddressService.findByCep(cleanCep);
            if (response.success && response.data) {
                setNewAddress(prev => ({
                    ...prev,
                    logradouro: response.data.logradouro,
                    bairro: response.data.bairro,
                    city: response.data.localidade, 
                    estado: response.data.uf
                }));
                await updateFreight(cleanCep);
                // AQUI: Removi a linha do toast 'info' (azul)
            } else {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'CEP não encontrado.' });
                setFreightCost(0);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCepBlur();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectAddress = async (id: number, cep?: string) => {
        if (isProcessing) return;
        setSelectedAddressId(id);
        
        if (id === NEW_ADDRESS_ID) {
            const cleanCep = newAddress.cep.replace(/\D/g, '');
            if (cleanCep.length >= 8) await updateFreight(cleanCep);
            else setFreightCost(0);
        } else if (cep) {
            await updateFreight(cep);
        }
    };

    const handleContinue = async () => {
        if (selectedAddressId === null) {
            toast.current?.show({ severity: 'warn', summary: 'Atenção', detail: 'Selecione um endereço.' });
            return;
        }

        setIsProcessing(true);
        let finalAddressId = selectedAddressId;
        let finalAddressData: IAddress | undefined;

        if (selectedAddressId === NEW_ADDRESS_ID) {
            if (!newAddress.cep || !newAddress.logradouro || !newAddress.numero || !newAddress.bairro || !newAddress.city) {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Preencha os campos obrigatórios.' });
                setIsProcessing(false);
                return;
            }

            const addressToSave: IAddress = { ...newAddress }; 
            
            const response = await AddressService.create(addressToSave);

            if (response.success && response.data) {
                const savedAddress = response.data as IAddress;
                if (savedAddress.id) {
                    finalAddressId = savedAddress.id;
                    finalAddressData = savedAddress;
                    // Mantive a mensagem verde de sucesso
                    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Endereço salvo!' });
                } else {
                    await loadAddresses();
                    setIsProcessing(false);
                    return; 
                }
            } else {
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar endereço.' });
                setIsProcessing(false);
                return;
            }
        } 
        else {
            finalAddressData = addresses.find(a => a.id === selectedAddressId);
        }

        if (finalAddressData) {
            sessionStorage.setItem('checkout_address_data', JSON.stringify(finalAddressData));
            sessionStorage.setItem('checkout_address_id', String(finalAddressId));
            sessionStorage.setItem('checkout_freight', String(freightCost));
            sessionStorage.setItem('checkout_days', String(deliveryDays));

            setTimeout(() => {
                navigate("/checkout/payment");
            }, 1000);
        } else {
            toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Dados do endereço não encontrados.' });
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout-container">
            <Toast ref={toast} />

            <div className="section-header">
                <h2><i className="pi pi-map-marker" style={{marginRight: '10px'}}></i> Endereço de Entrega</h2>
                <span className="divisor"></span>
            </div>

            <div className="lista-enderecos">
                {addresses.map((addr) => (
                    <div 
                        key={addr.id} 
                        className={`endereco-card ${selectedAddressId === addr.id ? 'selecionado' : ''}`}
                        onClick={() => handleSelectAddress(addr.id!, addr.cep)}
                    >
                        <div className="endereco-card-header">
                            <div className="radio-container">
                                <input 
                                    type="radio" 
                                    name="endereco" 
                                    checked={selectedAddressId === addr.id}
                                    readOnly
                                    style={{ transform: 'scale(1.5)', accentColor: '#800000' }}
                                />
                            </div>
                            <div className="endereco-info">
                                <h3>{addr.title || "Minha Casa"}</h3>
                                <p><strong>{addr.logradouro}, {addr.numero}</strong></p>
                                <p>{addr.bairro} - {addr.city}/{addr.estado}</p>
                                <p className="text-gray-500 text-sm">CEP: {addr.cep}</p>
                                {selectedAddressId === addr.id && freightCost > 0 && (
                                    <div className="freight-info mt-2">
                                        Melhor Envio: <strong>{freightCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                        <span className="text-gray-600 ml-2 text-sm">({deliveryDays} dias úteis)</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div 
                    className={`endereco-card ${selectedAddressId === NEW_ADDRESS_ID ? 'selecionado' : ''}`}
                    onClick={(e) => {
                        if ((e.target as HTMLElement).tagName !== 'INPUT') {
                            handleSelectAddress(NEW_ADDRESS_ID);
                        }
                    }}
                >
                    <div className="endereco-card-header">
                        <div className="radio-container">
                            <input 
                                type="radio" 
                                name="endereco" 
                                checked={selectedAddressId === NEW_ADDRESS_ID}
                                onChange={() => handleSelectAddress(NEW_ADDRESS_ID)}
                                style={{ transform: 'scale(1.5)', accentColor: '#800000' }}
                            />
                        </div>
                        <div className="endereco-info" style={{width: '100%'}}>
                            <h3><i className="pi pi-plus-circle mr-2"></i> Adicionar Novo Endereço</h3>
                            <p>Cadastrar um novo local de entrega</p>
                            {selectedAddressId === NEW_ADDRESS_ID && freightCost > 0 && (
                                <div className="freight-info mt-2">
                                    Melhor Envio: <strong>{freightCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                    <span className="text-gray-600 ml-2 text-sm">({deliveryDays} dias úteis)</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedAddressId === NEW_ADDRESS_ID && (
                        <div className="card-form-container" onClick={(e) => e.stopPropagation()}>
                            <div className="form-grid">
                                <div className="form-group form-full">
                                    <label>Título (Ex: Casa, Trabalho)</label>
                                    <input name="title" className="form-control" placeholder="Dê um nome" value={newAddress.title} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>CEP *</label>
                                    <input name="cep" className="form-control" placeholder="00000-000" maxLength={9} value={newAddress.cep} onChange={handleInputChange} onBlur={handleCepBlur} onKeyDown={handleKeyDown} />
                                </div>
                                <div className="form-group">
                                    <label>Cidade</label>
                                    <input name="city" className="form-control" value={newAddress.city} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <input name="estado" className="form-control" value={newAddress.estado} readOnly />
                                </div>
                                <div className="form-group form-full">
                                    <label>Logradouro *</label>
                                    <input name="logradouro" className="form-control" value={newAddress.logradouro} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Número *</label>
                                    <input name="numero" className="form-control" value={newAddress.numero} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Bairro *</label>
                                    <input name="bairro" className="form-control" value={newAddress.bairro} onChange={handleInputChange} />
                                </div>
                                <div className="form-group form-full">
                                    <label>Complemento</label>
                                    <input name="complemento" className="form-control" placeholder="Apto, Bloco..." value={newAddress.complemento} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="actions-bar">
                <button className="btn-back" onClick={() => navigate("/cart")} disabled={isProcessing}>
                    <i className="pi pi-arrow-left"></i> Voltar
                </button>
                <button className="btn-continue" onClick={handleContinue} disabled={selectedAddressId === null || isProcessing} style={isProcessing ? { opacity: 0.7, cursor: 'wait' } : {}}>
                    {isProcessing ? 'Processando...' : (selectedAddressId === NEW_ADDRESS_ID ? 'Salvar e Continuar' : 'Continuar')} 
                    {!isProcessing && <i className="pi pi-arrow-right ml-2"></i>}
                </button>
            </div>
        </div>
    );
};