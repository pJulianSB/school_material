"use client";

import styles from "./users.module.css";
import { useEffect, useRef, useState } from "react";
import { userColumns } from "app/utils/tableColumns";
import { getUsers } from "app/services/userService";
import { filterData, sortData, getPageSlice } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";

export default function UsersPage() {
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
    userColumns.filter((col) => col.filter).map((col) => col.id)
  );
  const sortableColumns = new Set(
    userColumns.filter((col) => col.sortable).map((col) => col.id)
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

    const loadUsers = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, hasMore } = await getUsers({
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
        setErrorMessage(error?.message || "No fue posible cargar los usuarios");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2>Lista de Usuarios</h2>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={userColumns}
          data={tableRows}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          sortBy={sortBy}
          filters={filters}
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
        {isLoading ? <p>Cargando usuarios...</p> : null}
      </section>
    </div>
  );
}

