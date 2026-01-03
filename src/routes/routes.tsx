// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
// Page components
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Auth/Login";
import BannerPage from "@/pages/Banner/BannerPage";
import OrderPage from "@/pages/Order/OrderPage";
import ProductPage from "@/pages/Product/ProductPage";
import KeyPointPage from "@/pages/KeyPoint/KeyPointPage";
import PromotionPage from "@/pages/Promotion/PromotionPage";

const AppRoutes = () => (
  <Routes>
    {/* Public route */}
    <Route path="/login" element={<Login />} />

    {/* Protected dashboard layout */}
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="order" element={<OrderPage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="key" element={<KeyPointPage />} />
      <Route path="banner" element={<BannerPage />} />
      <Route path="promotion" element={<PromotionPage />} />
      <Route path="settings" element={<Settings />} />
    </Route>

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
