import { CustomTable } from "@/admin/components/CustomTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { SearchInput } from "@/admin/components/searchInput";
import { getClientsAction } from "@/admin/actions/get-clients.action";
import { useEffect, useState } from "react";
import type { ClientsResponse } from "@/interfaces/clients.response";
import { SkeletonTable } from "@/admin/components/SkeletonTable";

export const ClientsPage = () => {
  const [data, setData] = useState<ClientsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadClients = async () => {
      try {
        const clients = await getClientsAction();
        setData(clients);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadClients();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Listado de clientes</CardTitle>
          <CardDescription>Detalle de clientes ingresados</CardDescription>
          <CardAction>
            <Link to="/clientes/new">
              <Button className="p-6">Agregar nuevo</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <SearchInput />
          {loading ? (
    <SkeletonTable />
  ) : (
    <CustomTable data={data} />
  )}
        </CardContent>
      </Card>
    </>
  );
};
