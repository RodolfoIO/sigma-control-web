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

export const ClientsPage = () => {
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
          <CustomTable />
        </CardContent>
      </Card>
    </>
  );
};
