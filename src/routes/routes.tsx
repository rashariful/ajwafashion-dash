// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Page components
import Dashboard from "@/pages/Dashboard";
import Tours from "@/pages/Tours";

import Bookings from "@/pages/Bookings";
import Customers from "@/pages/Customers";
import Settings from "@/pages/Settings";

import NotFound from "@/pages/NotFound";
import Login from "@/pages/Auth/Login"; // if you have
import Team from "@/pages/Team/Team";
import PartnerPage from "@/pages/Partner/PartnerPage";
import BannerPage from "@/pages/Banner/BannerPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import ServicePage from "@/pages/Service/ServicePage";
import PortfolioPage from "@/pages/Portfolio/PortfolioPage";
import TestimonialPage from "@/pages/Testimonial/TestimonialPage";
import ContactPage from "@/pages/Contact/ContactPage";
import QuotePage from "@/pages/Quote/QuotePage";
import FaqPage from "@/pages/Faq/FaqPage";
import OrderPage from "@/pages/Order/OrderPage";
import ProductPage from "@/pages/Product/ProductPage";

const AppRoutes = () => (
  <Routes>
    {/* Public route */}
    <Route path="/login" element={<Login />} />

    {/* Protected dashboard layout */}
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="order" element={<OrderPage />} />
      <Route path="product" element={<ProductPage />} />

      <Route path="bookings" element={<Bookings />} />
      <Route path="customers" element={<Customers />} />

      <Route path="banner" element={<BannerPage />} />
      <Route path="service" element={<ServicePage />} />
      <Route path="archive" element={<PortfolioPage />} />
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="testimonial" element={<TestimonialPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="quote" element={<QuotePage />} />
      <Route path="faq" element={<FaqPage />} />

      <Route path="settings" element={<Settings />} />

      <Route path="/">
        {/* <Route index  /> */}
        <Route path="team" element={<Team />} />
      </Route>
      <Route path="/">
        {/* <Route index  /> */}
        <Route path="partner" element={<PartnerPage />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
