import { api } from "@/lib/axios";
import { IResponse } from "@/commons/types";

const BASE_URL = "/orders";

const getMyOrders = async (): Promise<IResponse> => {
    try {
        const response = await api.get(`${BASE_URL}/my_orders`);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: "Erro ao buscar pedidos.", data: [] };
    }
};

const findById = async (id: number): Promise<IResponse> => {
    try {
        const response = await api.get(`${BASE_URL}/detail/${id}`);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: "Erro ao buscar detalhes do pedido." };
    }
};

const save = async (orderData: any): Promise<IResponse> => {
    try {
        const response = await api.post(BASE_URL, orderData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, message: "Erro ao processar pedido.", data: error };
    }
};

const OrderService = {
    getMyOrders,
    findById,
    save 
};

export default OrderService;