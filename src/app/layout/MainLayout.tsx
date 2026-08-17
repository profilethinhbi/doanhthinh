import { Outlet } from "react-router-dom";

import NavBar from "@/widgets/navbar/NavBar";

import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <NavBar />

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}