import type { IProduct, IResponse } from "@/commons/types";
import { api } from "@/lib/axios";

const productURL = "/products"; 

const save = async (product: IProduct): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const data = product.id 
        ? await api.put(`${productURL}/${product.id}`, product)
        : await api.post(productURL, product);

    response = {
      status: data.status,
      success: true,
      message: "Product saved successfully!", 
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response?.status || 500,
      success: false,
      message: "Failed to save product.", 
      data: err.response?.data,
    };
  }
  return response;
};

const findAll = async (categoryId?: number): Promise<IResponse> => {
  let response = {} as IResponse;
  try {
    const url = categoryId ? `${productURL}/category/${categoryId}` : productURL;
    const data = await api.get(url); 

    response = {
      status: 200,
      success: true,
      message: "Product list loaded successfully!", 
      data: data.data,
    };
  } catch (err: any) {
    response = {
      status: err.response?.status || 500,
      success: false,
      message: "Failed to load product list.", 
      data: err.response?.data,
    };
  }
  return response;
};

const remove = async (id: number): Promise<IResponse> => {
    let response = {} as IResponse;
    try {
        const data = await api.delete(`${productURL}/${id}`);
        response = {
            status: 200,
            success: true,
            message: "Product removed successfully!", 
            data: data.data,
        };
    } catch (err: any) {
        response = {
            status: err.response?.status || 500,
            success: false,
            message: "Failed to remove product.", 
            data: err.response?.data,
        };
    }
    return response;
};

const findById = async (id: number): Promise<IResponse> => {
    let response = {} as IResponse;
    try {
        const data = await api.get(`${productURL}/${id}`);
        response = {
            status: 200,
            success: true,
            message: "Product loaded successfully!", 
            data: data.data,
        };
    } catch (err: any) {
        response = {
            status: err.response?.status || 500,
            success: false,
            message: "Failed to load product.", 
            data: err.response?.data,
        };
    }
    return response;
};

const ProductService = {
  save,
  findAll, 
  remove,
  findById,
};

export default ProductService;