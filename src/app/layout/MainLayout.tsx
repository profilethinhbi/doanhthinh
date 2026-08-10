import { Outlet } from "react-router-dom";

import NavBar from "@/widgets/navbar/NavBar";
import Footer from "@/widgets/footer/Footer";

import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <NavBar />

      <main className="main-content">
        <Outlet />
        <Footer />
      </main>
    </>
  );
}