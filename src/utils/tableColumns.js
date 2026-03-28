import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { SeeIcon } from "app/components/icons/SeeIcon";
import { useRouter } from "next/navigation";

export const userColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "date", header: "Fecha", field: "date", sortable: false },
  { id: "name", header: "Nombres", field: "name", sortable: false },
  { id: "lastname", header: "Apellidos", field: "lastname", sortable: false },
  { id: "phone", header: "Teléfono", field: "phone", sortable: false },
  { id: "email", header: "Correo", field: "email", sortable: false },
  { id: "school", header: "Colegio", field: "school", sortable: false },
  { id: "city", header: "Ciudad", field: "city", sortable: false },
  { id: "province", header: "Departamento", field: "province", sortable: false },
  { id: "sales", header: "# Ventas", field: "sales", sortable: false },
  { id: "totalSales", header: "Total Ventas", field: "totalSales", sortable: false },
];

export const packageColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "date", header: "Fecha", field: "date", sortable: false },
  { id: "title", header: "Titulo", field: "title", sortable: false, width: "250px" },
  { id: "description", header: "Descripción", field: "description", sortable: false,  width: "450px" },
  { id: "subject", header: "Área", field: "subject", sortable: false },
  { id: "grade", header: "Grado", field: "grade", sortable: false },
  { id: "status", header: "Estado", field: "status", sortable: false },
  { id: "price", header: "Precio", field: "price", sortable: false },
  { id: "total_documents", header: "# Docs", field: "total_documents", sortable: false },
  { id: "edit", header: "Editar", field: "edit", type: "button",
    renderCell: (row) => {
      const router = useRouter();
      const handleEdit = () => {
        router.push(`/admin/package/${row.id}`);
      };
      return (
        <PrimaryButton
          type="button"
          onClick={handleEdit}
        >
          Editar
        </PrimaryButton>
      );
   },
  },
];

export const documentColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "type", header: "Tipo", field: "type", sortable: false },
  { id: "description", header: "Descripción", field: "description", sortable: false },
  { id: "subject", header: "Área", field: "subject", sortable: false },
  { id: "grade", header: "Grado", field: "grade", sortable: false },
  { id: "status", header: "Estado", field: "status", sortable: false },
  { id: "total_packages", header: "# Paquetes", field: "total_packages", sortable: false },
  { id: "material_url", header: "Enlace", field: "material_url", sortable: false,
    renderCell: (row) => {
      return (
        <SeeIcon
          url={row.material_url}
          elementLabel="Material"
          serial={row.serial}
        />
      );
    },
  },
  { id: "edit", header: "Editar", field: "edit", type: "button",
    renderCell: (row) => {
      const router = useRouter();
      const handleEdit = () => {
        router.push(`/admin/material/${row.id}`);
      };
      return (
        <PrimaryButton
          type="button"
          onClick={handleEdit}
        >
          Editar
        </PrimaryButton>
      );
   },
  }
];

export const billingColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "date_purchase", header: "Fecha", field: "date_purchase", sortable: false },
  { id: "total_packages", header: "No. Paquetes", field: "total_packages", sortable: false },
  { id: "ticket_id", header: "TicketId", field: "ticket_id", sortable: false },
  { id: "name", header: "Nombres", field: "name", sortable: false },
  { id: "lastname", header: "Apellidos", field: "lastname", sortable: false },
  { id: "email", header: "Correo", field: "email", sortable: false },
  { id: "phone", header: "Teléfono", field: "phone", sortable: false },
  { id: "status", header: "Estado", field: "status", sortable: false },
  { id: "invoice_url", header: "Factura", field: "invoice_url", sortable: false ,
    renderCell: (row) => {
      return (
        <SeeIcon
          url={row.invoice_url}
          elementLabel="Factura"
          serial={row.ticket_id}
        />
      );
    },
  },
  { id: "total_cost", header: "Costo", field: "total_cost", sortable: false },
  { id: "notes", header: "Notas", field: "notes", sortable: false },
];
