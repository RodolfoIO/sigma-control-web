import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
// import { useClients } from "../hooks/useClients2";
import type { ClientsResponse } from "@/interfaces/clients.response";

interface CustomTableProps {
  data?: ClientsResponse[];
}

const columnHelper = createColumnHelper<ClientsResponse>();

const columns = [
  columnHelper.accessor("nombres", {
    cell: (info) => info.getValue(),
    header: () => <span>Nombres</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.apellidos, {
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Apellidos</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("pasaporte_numero", {
    header: () => <span>Pasaporte</span>,
    footer: (info) => info.column.id,
  }),
];

export const CustomTable = ({data=[]}:CustomTableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="overflow-hidden rounded-md border border-gray-200">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="bg-slate-500 text-white p-4 text-left"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-200 cursor-pointer">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-4 border-b border-gray-200"
                  >
                    <Link
                      to={`/clientes/${row.original.id}`}
                      className="block w-full h-full"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
