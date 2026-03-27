
export const TYPE_MATERIAL_OPTIONS = [
  { value: "malla", label: "Malla" },
  { value: "actividad", label: "Actividad" },
  { value: "taller", label: "Taller" },
];

export const TYPE_MATERIAL_MAP = TYPE_MATERIAL_OPTIONS.reduce((acc, opcion) => {
  acc[opcion.value] = opcion.label;
  return acc;
}, {});

export const GRADES_OPTIONS = [
  { value: "primero", label: "Primero" },
  { value: "segundo", label: "Segundo" },
  { value: "tercero", label: "Tercero" },
  { value: "cuarto", label: "Cuarto" },
  { value: "quinto", label: "Quinto" },
  { value: "sexto", label: "Sexto" },
  { value: "septimo", label: "Septimo" },
  { value: "octavo", label: "Octavo" },
  { value: "noveno", label: "Noveno" },
];

export const GRADES_MAP = GRADES_OPTIONS.reduce((acc, opcion) => {
  acc[opcion.value] = opcion.label;
  return acc;
}, {});

export const SUBJECTS_OPTIONS = [
  { value: "matematicas", label: "Matemáticas" },
  { value: "lenguaje", label: "Lenguaje" },
  { value: "ciencias", label: "Ciencias Naturales" },
  { value: "sociales", label: "Ciencias Sociales" },
  { value: "ingles", label: "Inglés" },
];

export const SUBJECTS_MAP = SUBJECTS_OPTIONS.reduce((acc, opcion) => {
  acc[opcion.value] = opcion.label;
  return acc;
}, {});

export const MATERIAL_STATUS_OPTIONS = [
  { value: "free", label: "Libre" },
  { value: "review", label: "En revisión" },
  { value: "assigned", label: "Asignado" },
];

export const MATERIAL_STATUS_MAP = MATERIAL_STATUS_OPTIONS.reduce((acc, opcion) => {
  acc[opcion.value] = opcion.label;
  return acc;
}, {});

export const PACKAGE_STATUS_OPTIONS = [
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" },
];

export const PACKAGE_STATUS_MAP = PACKAGE_STATUS_OPTIONS.reduce((acc, opcion) => {
  acc[opcion.value] = opcion.label;
  return acc;
}, {});

export const BILLING_STATUS_OPTIONS = [
  { value: "pending", label: "Pendiente" },
  { value: "paid", label: "Pagado" },
  { value: "rejected", label: "Rechazado" },
  { value: "cancelled", label: "Cancelado" },
  { value: "refunded", label: "Reembolsado" },
];

export const BILLING_STATUS_MAP = BILLING_STATUS_OPTIONS.reduce((acc, opcion) => {
  acc[opcion.value] = opcion.label;
  return acc;
}, {});
