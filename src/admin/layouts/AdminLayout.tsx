import { Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { AdminSidebar } from "../components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminHeader } from "../components/AdminHeader";
import { useAuthStore } from "@/auth/store/auth.store";
import { LoaderModal } from "@/components/loader";

const AdminLayout = () => {
  const { pathname } = useLocation();

  const { user, loading } = useAuthStore();
  

  if (loading) {
    return (
      <LoaderModal open={loading} />
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarTrigger className="absolute top-7 left-8 md:hidden" />
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
