export const routes = [
  { path: "/", label: "Material", title: "Materiales", subtitle: "Material de clase" },
  { path: "/company", label: "Empresa", title: "Asesorias Pedagógicas", subtitle: "Conoce nuestro equipo" },
  { path: "/contact", label: "Contacto", title: "Contáctanos", subtitle: "Información de contacto" },
  { path: "/login", label: "Login", title: "", subtitle: "" },
  { path: "/admin", label: "Ventas", title: "Vista de Administrador", subtitle: "" },
  { path: "/admin/users", label: "Usuarios", title: "Usuarios", subtitle: "" },
  { path: "/admin/packageList", label: "Paquetes", title: "Paquetes", subtitle: "" },
  { path: "/admin/materialList", label: "Documentos", title: "Documentos", subtitle: "" },
  { path: "/admin/package", label: "Crear Paquete", title: "Detalle de Paquete", subtitle: "" },
  { path: "/admin/material", label: "Crear Documento", title: "Detalle de un Documento", subtitle: "" }
];

export const adminRoutes = routes.filter((r) => r.path.startsWith("/admin"));

/**
 * Devuelve { title, subtitle } para el pathname actual.
 * Si no hay coincidencia en routes, usa el pathname como título y subtítulo.
 */
export function getRouteInfo(pathname) {
  const route = routes.find((r) => r.path === pathname);
  if (route) {
    return { title: route.title, subtitle: route.subtitle };
  }
  const fallback = pathname || "/";
  return { title: fallback, subtitle: fallback };
}
