
export const MOCK_USERS = Array.from({ length: 50 }).map((_, index) => ({
    id: index + 1,
    name: `Nombres ${index + 1}`,
    lastname: `Apellidos ${index + 1}`,
    phone: `3202090322`,
    email: `usuario${index + 1}@example.com`,
    school: `Colegio ${index + 1}`,
    city: `Ciudad ${index + 1}`,
    province: `Depart ${index + 1}`,
    sales: index,
    totalSales: `$ ${index}.000`,
  }));

  export const MOCK_PACKAGES = Array.from({ length: 25 }).map((_, index) => ({
    id: index + 1,
    date: `21-02-2026`,
    title: `Title ${index + 1}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor ullamcorper erat volutpat fringilla. Curabitur viverra imperdiet dui, eu tincidunt nisl ultricies vitae. Aliquam fermentum purus vitae enim dapibus facilisis ${index + 1}.`,
    subject: `Matematicas`,
    grade: `Grado ${index + 1}`,
    status: `Activo`,
    price: `$ ${index}.000`,
    documents: 7,
  }));

  export const MOCK_DOCUMENTS = Array.from({ length: 25 }).map((_, index) => ({
    id: index + 1,
    type: `Taller ${index + 1}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor ullamcorper erat volutpat fringilla. Curabitur viverra imperdiet dui, eu tincidunt nisl ultricies vitae. Aliquam fermentum purus vitae enim dapibus facilisis ${index + 1}.`,
    subject: `Matematicas`,
    grade: `Grado ${index + 1}`,
    status: `Libre`,
    url: `www.text.com.co`,
    packages: 7,
  }));

  export const MOCK_BILLING = Array.from({ length: 25 }).map((_, index) => ({
    id: index + 1,
    date: `21-02-2026`,
    package: `Paquete ${index + 1}`,
    ticketId: `TicketId ${index + 1}`,
    name: `Nombres ${index + 1}`,
    lastname: `Apellidos ${index + 1}`,
    email: `usuario${index + 1}@example.com`,
    status: `Activo`,
    support: `www.text.com.co`,
    value: `$ ${index}.000`,
    notes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit ${index + 1}.`,
  }));