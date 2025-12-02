import { api } from "@/lib/axios";
import axios from "axios";
import { IAddress } from "@/commons/types";

const BASE_URL = "/addresses";

const getMyAddresses = async () => {
    try {
        const response = await api.get(`${BASE_URL}/my_address`);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, data: [], error };
    }
};

const create = async (address: IAddress) => {
    try {
        const response = await api.post(BASE_URL, address);
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error };
    }
};

const findByCep = async (cep: string) => {
    try {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) return { success: false, error: 'CEP inválido' };

        const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
        if (response.data.erro) {
            return { success: false, error: 'CEP não encontrado' };
        }
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: 'Erro ao consultar ViaCEP' };
    }
};

interface FreightResult {
    value: number;
    deliveryDays: number;
}

const calculateFreight = async (cep: string, totalValue: number): Promise<FreightResult> => {
    try {
        const response = await api.post('/freight/calculate', { 
            cep, 
            totalValue 
        });
        return {
            value: response.data.value || 0.0,
            deliveryDays: response.data.deliveryDays || 0
        };
    } catch (error) {
        console.error("Erro ao calcular frete", error);
        return { value: 0.0, deliveryDays: 0 };
    }
};

const AddressService = {
    getMyAddresses,
    create,
    findByCep,
    calculateFreight
};

export default AddressService;