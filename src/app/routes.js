export const routes = [
  { path: "/", label: "Material", title: "Material", subtitle: "Material de clase" },
  { path: "/company", label: "Empresa", title: "Asesorias Pedagógicas", subtitle: "Conoce nuestro equipo" },
  { path: "/contact", label: "Contacto", title: "Contáctanos", subtitle: "Información de contacto" },
  { path: "/admin", label: "Admin", title: "Admin", subtitle: "Admin" }
];

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
