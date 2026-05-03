import { useEffect, useState } from "react";
import { Link } from "react-router";

import { getClientsAction } from "@/admin/actions/get-clients.action";

import type { ClientsResponse } from "@/interfaces/clients.response";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchInput } from "@/admin/components/searchInput";
import { SkeletonTable } from "@/admin/components/SkeletonTable";
import { CustomTable } from "@/admin/components/CustomTable";

export const ClientsPage = () => {
  const [data, setData] = useState<ClientsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadClients = async () => {
      const clients = await getClientsAction();
      setData(clients);
      setLoading(false);
    };
    loadClients();
  }, []);

  const filteredData = data.filter((client) => {
    const value = search.toLowerCase();

    return (
      client.nombres.toLowerCase().includes(value) ||
      client.apellidos.toLowerCase().includes(value) ||
      client.pasaporte_numero.toLowerCase().includes(value)
    );
  });

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
          <SearchInput onSearch={setSearch} />
          {loading ? <SkeletonTable /> : <CustomTable data={filteredData} />}
        </CardContent>
      </Card>
    </>
  );
};
