"use client";

import styles from "./users.module.css";
import { useEffect, useRef, useState } from "react";
import { userColumns } from "app/utils/tableColumns";
import { getUsers } from "app/services/userService";
import { sortData } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";
import UsersFilter from "./UsersFilter";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const pageCursorsRef = useRef({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilters, setActiveFilters] = useState(null);

  const sortableColumns = new Set(
    userColumns.filter((col) => col.sortable).map((col) => col.id)
  );
  const safeSortBy = sortBy && sortableColumns.has(sortBy.columnId) ? sortBy : null;
  const sortedRows = sortData(rows, safeSortBy);
  const tableRows = safeSortBy ? rows : sortedRows;

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, totalItems } = await getUsers({
          pageSize,
          lastVisible: previousCursor || null,
          filters: activeFilters || {},
        });

        if (!isMounted) return;

        setRows(items);
        setTotalItems(totalItems);
        pageCursorsRef.current[page] = lastVisible;
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
  }, [page, pageSize, activeFilters]);

  const handleApplyFilters = (filters) => {
    setErrorMessage("");
    setPage(1);
    pageCursorsRef.current = {};
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
    setSortBy(null);
    setPage(1);
    pageCursorsRef.current = {};
  };

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2>Lista de Usuarios</h2>
        <UsersFilter
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={userColumns}
          data={tableRows}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          sortBy={safeSortBy}
          onSortChange={(nextSort) => {
            setSortBy(nextSort);
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

