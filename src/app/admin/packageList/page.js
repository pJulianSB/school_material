"use client";

import styles from "./packageList.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { packageColumns } from "app/utils/tableColumns";
import { filterData, sortData } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { getPackages } from "app/services/packageService";

export default function PackageListPage() {
  const router = useRouter();
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
    packageColumns.filter((col) => col.filter).map((col) => col.id)
  );
  const sortableColumns = new Set(
    packageColumns.filter((col) => col.sortable).map((col) => col.id)
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

    const loadPackages = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, hasMore } = await getPackages({
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
        setErrorMessage(error?.message || "No fue posible cargar los paquetes");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadPackages();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  const handleCreatePackage = () => {
    router.push("/admin/package");
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
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={packageColumns}
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
        {isLoading ? <p>Cargando paquetes...</p> : null}
      </section>
    </div>
  );
}

