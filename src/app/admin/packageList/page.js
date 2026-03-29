"use client";

import styles from "./packageList.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { packageColumns } from "app/utils/tableColumns";
import { sortData } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import PackageFilter from "./_components/PackageFilter/PackageFilter";
import { getPackages } from "app/services/packageService";

export default function PackageListPage() {
  const router = useRouter();
  const pageCursorsRef = useRef({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rows, setRows] = useState([]);
  const [activeFilters, setActiveFilters] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sortableColumns = new Set(
    packageColumns.filter((col) => col.sortable).map((col) => col.id)
  );
  const safeSortBy = sortBy && sortableColumns.has(sortBy.columnId) ? sortBy : null;
  const sortedRows = sortData(rows, safeSortBy);
  const tableRows = safeSortBy ? rows : sortedRows;

  useEffect(() => {
    let isMounted = true;

    const loadPackages = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, totalItems } = await getPackages({
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
        setErrorMessage(error?.message || "No fue posible cargar los paquetes");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadPackages();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize, activeFilters]);

  const handleCreatePackage = () => {
    router.push("/admin/package");
  };

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
        <div className={styles.cardHeader}>
          <h2>Lista de paquetes</h2>
          <PrimaryButton
            type="button"
            onClick={handleCreatePackage}
            >
            Crear paquete
          </PrimaryButton>
        </div>
        <PackageFilter
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={packageColumns}
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
          actionButtonLabel="Editar"
          onActionClick={(rowId) => {
            console.log("rowId", rowId);
          }}
        />
        {isLoading ? <p>Cargando paquetes...</p> : null}
      </section>
    </div>
  );
}

