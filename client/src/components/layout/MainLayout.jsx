import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../Sidebar";

const MainLayout = () => {
  return (
    <SidebarProvider>
    <div className="w-full flex">
      <AppSidebar />
      <main className="flex flex-col w-full min-h-screen flex-1">
        <Navbar>
          <SidebarTrigger /> 
        </Navbar>
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  </SidebarProvider>
  );
};

export default MainLayout;
