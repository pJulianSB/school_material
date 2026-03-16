"use client";

import styles from "./materialList.module.css";
import { useEffect, useRef, useState } from "react";
import { documentColumns } from "app/utils/tableColumns";
import { DataTable } from "app/components/ui/DataTable";
import { getMaterials } from "app/services/materialService";
import { filterData, sortData } from "app/utils/tableUtils";

export default function MaterialListPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const pageCursorsRef = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const filterableColumns = new Set(
    documentColumns.filter((col) => col.filter).map((col) => col.id)
  );
  const sortableColumns = new Set(
    documentColumns.filter((col) => col.sortable).map((col) => col.id)
  );

  const safeFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => {
      return filterableColumns.has(key) && String(value ?? "").trim() !== "";
    })
  );
  const safeSortBy =
    sortBy && sortableColumns.has(sortBy.columnId) ? sortBy : null;
  const filteredRows = filterData(rows, safeFilters);
  const tableRows = sortData(filteredRows, safeSortBy);

  useEffect(() => {
    let isMounted = true;

    const loadMaterials = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, hasMore } = await getMaterials({
          pageSize,
          lastVisible: previousCursor || null,
        });

        if (!isMounted) return;

        setRows(items);
        pageCursorsRef.current[page] = lastVisible;

        const loadedCount = (page - 1) * pageSize + items.length;
        // Con hasMore en true dejamos la siguiente página habilitada.
        setTotalItems(hasMore ? loadedCount + 1 : loadedCount);
      } catch (error) {
        if (!isMounted) return;
        setRows([]);
        setTotalItems(0);
        setErrorMessage(error?.message || "No fue posible cargar los materiales");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadMaterials();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2>Lista de Documentos</h2>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={documentColumns}
          data={tableRows}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          sortBy={safeSortBy}
          filters={safeFilters}
          onSortChange={(nextSort) => {
            setSortBy(nextSort);
            setPage(1);
            pageCursorsRef.current = {};
          }}
          onFilterChange={(nextFilters) => {
            setFilters(nextFilters);
            setPage(1);
            pageCursorsRef.current = {};
          }}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
            pageCursorsRef.current = {};
          }}
        />
        {isLoading ? <p>Cargando materiales...</p> : null}
      </section>
    </div>
  );
}

