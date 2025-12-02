import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
import { AuthPage } from "@/pages/auth-page";
import { HomePage } from "@/pages/home-page"; 
import { RequireAuth } from "@/components/require-auth";
import { CategoryListPage } from "@/pages/category-list";
import { CategoryFormPage } from "@/pages/category-form";
import { ProductListPage } from "@/pages/product-list-page"; 
import { ProductFormPage } from "@/pages/product-form";
import { NotFound } from "@/pages/not-found";
import { ProductDetailPage } from "@/pages/product-detail-page"; 
import { CartPage } from "@/pages/cart-page";
import { PrivacyPolicyPage } from "@/pages/privacy-policy-page";
import { CheckoutAddressPage } from "@/pages/checkout-address-page";
import { CheckoutPaymentPage } from "@/pages/checkout-payment-page";
import { CheckoutSummaryPage } from "@/pages/checkout-summary-page";
import { MyOrdersPage } from "@/pages/my-orders-page";
import { OrderDetailPage } from "@/pages/order-detail-page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> 
        
        <Route path="/" element={<HomePage />} /> 
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} /> 
        <Route path="/cart" element={<CartPage />} /> 

        <Route element={<RequireAuth />}>
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id" element={<CategoryFormPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />
        
          <Route path="/checkout/address" element={<CheckoutAddressPage />} />
          
          <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
          <Route path="/checkout/summary" element={<CheckoutSummaryPage />} />

          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/my-orders/:id" element={<OrderDetailPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}