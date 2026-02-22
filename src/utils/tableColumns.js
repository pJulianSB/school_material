
export const userColumns = [
    { id: "id", header: "No", field: "id", sortable: true, width: "60px" },
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
    { id: "id", header: "No", field: "id", sortable: true, width: "60px" },
    { id: "date", header: "Fecha", field: "date", sortable: true, filter: true },
    { id: "title", header: "Titulo", field: "title", sortable: true, filter: true },
    { id: "description", header: "Descripción", field: "description", sortable: false, filter: true },
    { id: "subject", header: "Área", field: "subject", sortable: true, filter: true },
    { id: "grade", header: "Grado", field: "grade", sortable: true, filter: true },
    { id: "status", header: "Estado", field: "status", sortable: true, filter: true },
    { id: "price", header: "Precio", field: "price", sortable: true, filter: true },
    { id: "documents", header: "# Docs", field: "documents", sortable: false },
  ];

  export const documentColumns = [
    { id: "id", header: "No", field: "id", sortable: true, width: "60px" },
    { id: "type", header: "Tipo", field: "type", sortable: true, filter: true },
    { id: "description", header: "Descripción", field: "description", sortable: false, filter: true },
    { id: "subject", header: "Área", field: "subject", sortable: true, filter: true },
    { id: "grade", header: "Grado", field: "grade", sortable: true, filter: true },
    { id: "status", header: "Estado", field: "status", sortable: true, filter: true },
    { id: "url", header: "Enlace", field: "url", sortable: false },
    { id: "packages", header: "# Paquetes", field: "packages", sortable: false },
  ];

  export const billingColumns = [
    { id: "id", header: "No", field: "id", sortable: true, width: "60px" },
    { id: "date", header: "Fecha", field: "date", sortable: true, filter: true },
    { id: "package", header: "Paquete", field: "package", sortable: true, filter: true },
    { id: "ticketId", header: "TicketId", field: "ticketId", sortable: true, filter: true },
    { id: "name", header: "Nombres", field: "name", sortable: true, filter: true },
    { id: "lastname", header: "Apellidos", field: "lastname", sortable: true, filter: true },
    { id: "email", header: "Correo", field: "email", sortable: true, filter: true },
    { id: "status", header: "Estado", field: "status", sortable: true, filter: true },
    { id: "support", header: "Soporte", field: "support", sortable: false },
    { id: "value", header: "Valor", field: "value", sortable: false },
    { id: "notes", header: "Descripción", field: "notes", sortable: false, filter: true },
  ];
