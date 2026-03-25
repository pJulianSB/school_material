
export const userColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "date", header: "Fecha", field: "date", sortable: true },
  { id: "name", header: "Nombres", field: "name", sortable: true, filter: true },
  { id: "lastname", header: "Apellidos", field: "lastname", sortable: true, filter: true },
  { id: "phone", header: "Teléfono", field: "phone", sortable: false, filter: true },
  { id: "email", header: "Correo", field: "email", sortable: true, filter: true },
  { id: "school", header: "Colegio", field: "school", sortable: true, filter: true },
  { id: "city", header: "Ciudad", field: "city", sortable: true, filter: true },
  { id: "province", header: "Departamento", field: "province", sortable: false },
  { id: "sales", header: "# Ventas", field: "sales", sortable: false },
  { id: "totalSales", header: "Total Ventas", field: "totalSales", sortable: false },
];

export const packageColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "date", header: "Fecha", field: "date", sortable: true, filter: true },
  { id: "title", header: "Titulo", field: "title", sortable: true, filter: true, width: "250px" },
  { id: "description", header: "Descripción", field: "description", sortable: false, filter: true,  width: "450px" },
  { id: "subject", header: "Área", field: "subject", sortable: true, filter: true },
  { id: "grade", header: "Grado", field: "grade", sortable: true, filter: true },
  { id: "status", header: "Estado", field: "status", sortable: true, filter: true },
  { id: "price", header: "Precio", field: "price", sortable: true, filter: true },
  { id: "total_documents", header: "# Docs", field: "total_documents", sortable: false },
  { id: "edit", header: "Editar", field: "edit", type: "button" },
];

export const documentColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "type", header: "Tipo", field: "type", sortable: true, filter: true },
  { id: "description", header: "Descripción", field: "description", sortable: false, filter: true, width: "250px" },
  { id: "subject", header: "Área", field: "subject", sortable: true, filter: true },
  { id: "grade", header: "Grado", field: "grade", sortable: true, filter: true },
  { id: "status", header: "Estado", field: "status", sortable: true, filter: true },
  { id: "material_url", header: "Enlace", field: "material_url", sortable: false },
  { id: "total_packages", header: "# Paquetes", field: "total_packages", sortable: false },
  { id: "edit", header: "Editar", field: "edit", type: "button" },
];

export const billingColumns = [
  { id: "serial", header: "No", field: "serial", sortable: true, width: "60px" },
  { id: "date_purchase", header: "Fecha", field: "date_purchase", sortable: true, filter: true },
  { id: "total_packages", header: "No. Paquetes", field: "total_packages", sortable: true },
  { id: "ticket_id", header: "TicketId", field: "ticket_id", sortable: true, filter: true },
  { id: "name", header: "Nombres", field: "name", sortable: true, filter: true },
  { id: "lastname", header: "Apellidos", field: "lastname", sortable: true, filter: true },
  { id: "email", header: "Correo", field: "email", sortable: true, filter: true },
  { id: "phone", header: "Teléfono", field: "phone", sortable: false, filter: true },
  { id: "status", header: "Estado", field: "status", sortable: true, filter: true },
  { id: "invoice_url", header: "Factura", field: "invoice_url", sortable: false },
  { id: "total_cost", header: "Costo", field: "total_cost", sortable: false },
  { id: "notes", header: "Notas", field: "notes", sortable: false, filter: true },
];
