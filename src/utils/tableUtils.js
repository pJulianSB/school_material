/**
 * Ordena un array de datos según sortBy (columnId y direction).
 * @param {Array} data - Array de registros
 * @param {{ columnId: string, direction: 'asc' | 'desc' } | null} sortBy
 * @returns {Array} Copia ordenada del array
 */
export function sortData(data, sortBy) {
  if (!sortBy || !data.length) return data;
  const { columnId, direction } = sortBy;
  const factor = direction === "asc" ? 1 : -1;
  return [...data].sort((a, b) => {
    const va = a[columnId];
    const vb = b[columnId];
    if (va == null && vb == null) return 0;
    if (va == null) return -1 * factor;
    if (vb == null) return 1 * factor;
    if (va < vb) return -1 * factor;
    if (va > vb) return 1 * factor;
    return 0;
  });
}

/**
 * Filtra registros donde cada clave de filters coincide (búsqueda case-insensitive por inclusión).
 * @param {Array} data - Array de registros
 * @param {Record<string, string>} filters - Objeto { [field]: valor }
 * @returns {Array}
 */
export function filterData(data, filters) {
  if (!filters || !Object.keys(filters).length) return data;
  return data.filter((row) =>
    Object.entries(filters).every(([key, value]) => {
      if (value == null || String(value).trim() === "") return true;
      const fieldValue = String(row[key] ?? "").toLowerCase();
      return fieldValue.includes(String(value).toLowerCase());
    })
  );
}

/**
 * Calcula totalItems, start y pageData para paginación en memoria.
 * @param {Array} data - Array ya filtrado/ordenado
 * @param {number} page - Página actual (1-based)
 * @param {number} pageSize - Tamaño de página
 * @returns {{ totalItems: number, start: number, pageData: Array }}
 */
export function getPageSlice(data, page, pageSize) {
  const totalItems = data.length;
  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);
  return { totalItems, start, pageData };
}
