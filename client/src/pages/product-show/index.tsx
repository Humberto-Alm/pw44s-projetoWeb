import { useEffect, useState, useRef } from "react";
import ProductService from "@/services/product-service";
import { Toast } from "primereact/toast";
import { ProductCard } from "@/components/product-card";
import { IProduct } from "@/commons/types";

export const ProductShow = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { findAll } = ProductService;
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await findAll();
      if (response.status === 200) {
        setProducts(Array.isArray(response.data) ? response.data : []);
      } else {
        showError("Não foi possível carregar a lista de produtos.");
      }
    } catch (error) {
      console.error(error);
      showError("Erro de conexão ao carregar produtos.");
    }
  };

  const showError = (msg: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Erro",
      detail: msg,
      life: 3000,
    });
  };

  const handleAddToCart = (product: IProduct) => {
    toast.current?.show({
      severity: "success",
      summary: "Sucesso",
      detail: `${product.name} adicionado ao carrinho!`,
      life: 3000,
    });
  };

  return (
    <div className="grid">
      <Toast ref={toast} />
      
      {products.map((product) => (
        <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
        />
      ))}
    </div>
  );
};