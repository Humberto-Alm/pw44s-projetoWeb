import { api } from "@/lib/axios";
import { IUserRegister } from "@/commons/types";

const BASE_URL = "/users";

const signup = async (userData: IUserRegister) => {
    try {
        const response = await api.post(BASE_URL, userData);
        return { success: true, data: response.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro.';
        return { success: false, message: errorMessage, error };
    }
};

const UserService = {
    signup
};

export default UserService;