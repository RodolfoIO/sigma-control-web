import { Outlet, useLocation } from "react-router";

import { AdminSidebar } from "../components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from '../components/AdminHeader';

const AdminLayout = () => {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>

      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader title={pathname} />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
