import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { Paginator } from 'primereact/paginator'; // <--- IMPORTANTE
import type { IProduct } from "@/commons/types";
import ProductService from "@/services/product-service";
import { ProductCard } from "@/components/product-card";
import './styles.css';

export const ProductListPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- ESTADOS DA PAGINAÇÃO ---
  const [first, setFirst] = useState(0); // Índice do primeiro item da página
  const [rows, setRows] = useState(12);  // Quantos produtos por página
  
  const toast = useRef<Toast>(null);
  
  const [searchParams] = useSearchParams();
  const categoryIdParam = searchParams.get('categoryId');
  const categoryName = searchParams.get('title') || 'Todos os Produtos';

  useEffect(() => {
    loadProducts();
  }, [categoryIdParam]); 

  const loadProducts = async () => {
    setLoading(true);
    // Resetar para a página 1 sempre que trocar de categoria
    setFirst(0); 
    try {
      const id = categoryIdParam ? parseInt(categoryIdParam) : undefined;
      const response = await ProductService.findAll(id);

      if (response.success && Array.isArray(response.data)) {
        setProducts(response.data as IProduct[]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowToast = (product: IProduct) => {
      toast.current?.show({ 
          severity: 'success', 
          summary: 'Sucesso', 
          detail: `${product.name} adicionado ao carrinho!`, 
          life: 3000 
      });
  };

  // Função chamada quando o usuário clica nos números ou setas
  const onPageChange = (event: any) => {
      setFirst(event.first);
      setRows(event.rows);
      // Rola para o topo suavemente ao mudar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Aqui a mágica: Pegamos apenas a "fatia" dos produtos da página atual
  const productsToShow = products.slice(first, first + rows);

  return (
    <div className="container mx-auto px-4 pt-5" style={{ minHeight: '80vh' }}>
      <Toast ref={toast} />
      
      <div className="lista-header flex align-items-center mb-4">
        <i className="pi pi-th-large header-icon text-3xl mr-3" style={{ color: '#800000' }}></i>
        <h2 className="header-title text-3xl m-0" style={{ color: '#800000' }}>{categoryName}</h2>
      </div>
      
      <div className="w-full mb-5" style={{ height: '4px', backgroundColor: '#e0e0e0' }}></div>

      {loading ? (
        <div className="flex flex-column align-items-center justify-content-center mt-5">
           <i className="pi pi-spin pi-spinner text-5xl" style={{ color: '#800000' }}></i>
           <p className="mt-3 text-lg text-600">A carregar produtos...</p>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <div className="produtos-container">
                {/* Renderiza apenas a fatia da página atual */}
                {productsToShow.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} onAddToCart={handleShowToast} />
                  </div>
                ))}
              </div>

              {/* COMPONENTE DE PAGINAÇÃO */}
              <div className="mt-5 mb-5">
                  <Paginator 
                    first={first} 
                    rows={rows} 
                    totalRecords={products.length} 
                    rowsPerPageOptions={[12, 24, 36]} 
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    className="custom-paginator"
                    style={{ backgroundColor: 'transparent', border: 'none' }}
                  />
              </div>
            </>
          ) : (
            <div className="flex flex-column align-items-center justify-content-center mt-5 text-gray-500">
              <i className="pi pi-box text-6xl mb-3"></i>
              <p className="text-xl">Nenhum produto encontrado.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};