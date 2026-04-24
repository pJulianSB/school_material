export const routes = [
  { path: "/", label: "Items", title: "Asesorias Pedagógicas y Projección Educativa", subtitle: "" },
  { path: "/items", label: "Paquetes", title: "Lista de Paquetes", subtitle: "" },
  { path: "/company", label: "Empresa", title: "Asesorias Pedagógicas", subtitle: "Conoce nuestro equipo" },
  { path: "/contact", label: "Contacto", title: "Contáctanos", subtitle: "" },
  { path: "/cart", label: "Carrito", title: "Carrito de Compra", subtitle: "" },
  { path: "/payment", label: "Pago", title: "Proceso de Compra", subtitle: "" },
  { path: "/login", label: "Login", title: "", subtitle: "" },
  { path: "/admin", label: "Ventas", title: "Vista de Administrador", subtitle: "", isSidebar: true },
  { path: "/admin/users", label: "Usuarios", title: "Usuarios", subtitle: "", isSidebar: true },
  { path: "/admin/packageList", label: "Paquetes", title: "Paquetes", subtitle: "", isSidebar: true },
  { path: "/admin/package", label: "Crear Paquete", title: "Detalle de Paquete", subtitle: "", isSidebar: true },
  { path: "/admin/package/:packageId", label: "Editar Paquete", title: "Editar Paquete", subtitle: "", isSidebar: false },
  { path: "/admin/materialList", label: "Materiales", title: "Materiales", subtitle: "", isSidebar: true },
  { path: "/admin/material", label: "Crear Material", title: "Detalle de Materiales", subtitle: "", isSidebar: true },
  { path: "/admin/material/:materialId", label: "Editar Material", title: "Editar Material", subtitle: "", isSidebar: false },
];

export const adminRoutes = routes.filter((r) => {
  return r.path.startsWith("/admin") && r.isSidebar;
});

export function getRouteInfo(pathname) {
  if (pathname.startsWith("/admin/material/")) {
    return { title: "Editar Material", subtitle: "" };
  }
  if (pathname.startsWith("/admin/package/")) {
    return { title: "Editar Paquete", subtitle: "" };
  }
  const route = routes.find((r) => r.path === pathname);
  if (route) {
    return { title: route.title, subtitle: route.subtitle };
  }
  const fallback = pathname || "/";
  return { title: fallback, subtitle: fallback };
}
