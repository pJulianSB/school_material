export const routes = [
  { path: "/", label: "Material", title: "Materiales", subtitle: "Material de clase" },
  { path: "/company", label: "Empresa", title: "Asesorias Pedagógicas", subtitle: "Conoce nuestro equipo" },
  { path: "/contact", label: "Contacto", title: "Contáctanos", subtitle: "" },
  { path: "/login", label: "Login", title: "", subtitle: "" },
  { path: "/admin", label: "Ventas", title: "Vista de Administrador", subtitle: "" },
  { path: "/admin/users", label: "Usuarios", title: "Usuarios", subtitle: "" },
  { path: "/admin/packageList", label: "Paquetes", title: "Paquetes", subtitle: "" },
  { path: "/admin/materialList", label: "Materiales", title: "Materiales", subtitle: "" },
  { path: "/admin/package", label: "Crear Paquete", title: "Detalle de Paquete", subtitle: "" },
  { path: "/admin/material", label: "Crear Material", title: "Detalle de un Material", subtitle: "" }
];

export const adminRoutes = routes.filter((r) => r.path.startsWith("/admin"));

export function getRouteInfo(pathname) {
  const route = routes.find((r) => r.path === pathname);
  if (route) {
    return { title: route.title, subtitle: route.subtitle };
  }
  const fallback = pathname || "/";
  return { title: fallback, subtitle: fallback };
}
