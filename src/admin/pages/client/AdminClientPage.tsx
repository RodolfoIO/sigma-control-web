import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";

export const AdminClientPage = () => {
  const { id } = useParams();
  return (
    <>
      <h1>AdminClientPage</h1>

      {id}
      <br />
      <Link to="/clientes">
        <Button className="p-6" variant={"destructive"}>
          Cancelar
        </Button>
      </Link>
    </>
  );
};
