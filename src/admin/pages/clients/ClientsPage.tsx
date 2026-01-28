import { CustomTable } from "@/admin/components/CustomTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const ClientsPage = () => {
  return (
    <>
      <div className="flex w-full justify-end px-4 pb-2">
        <Link to="/clientes/new">
          <Button className="p-6">Agregar nuevo</Button>
        </Link>
      </div>
      <CustomTable />
    </>
  );
};
