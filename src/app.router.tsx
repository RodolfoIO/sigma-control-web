import { createHashRouter } from "react-router";

import AdminLayout from "./admin/layouts/AdminLayout";

import { MainPage } from "./admin/pages/main/MainPage";
import { ClientsPage } from "./admin/pages/clients/ClientsPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AppointmentsPage } from "./admin/pages/appointments/AppointmentsPage";
import { AdminClientPage } from "./admin/pages/client/AdminClientPage";

import LoginPage from "./auth/pages/loginPage";

import { AuthProvider } from "./auth/providers/provider";

export const appRouter = createHashRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "clientes",
            element: <ClientsPage />,
          },
          {
            path: "clientes/:id",
            element: <AdminClientPage />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "citas",
            element: <AppointmentsPage />,
          },
        ],
      },
    ],
  },
]);