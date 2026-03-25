"use client";

import styles from "./admin.module.css";
import { useEffect, useRef, useState } from "react";
import { billingColumns } from "app/utils/tableColumns";
import { filterData, sortData } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { getBilling } from "app/services/billingService";

export default function BillingListPage() {
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
    billingColumns.filter((col) => col.filter).map((col) => col.id)
  );
  const sortableColumns = new Set(
    billingColumns.filter((col) => col.sortable).map((col) => col.id)
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

    const loadBilling = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, hasMore } = await getBilling({
          pageSize,
          lastVisible: previousCursor || null,
        });

        if (!isMounted) return;

        setRows(items);
        pageCursorsRef.current[page] = lastVisible;

        const loadedCount = (page - 1) * pageSize + items.length;
        setTotalItems(hasMore ? loadedCount + 1 : loadedCount);
      } catch (error) {
        if (!isMounted) return;
        setRows([]);
        setTotalItems(0);
        setErrorMessage(error?.message || "No fue posible cargar las facturas");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadBilling();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  const handleCreateBilling = () => {
    console.log("Crear factura");
  }

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2>Lista de facturas</h2>
        </div>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={billingColumns}
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
        {isLoading ? <p>Cargando facturas...</p> : null}
      </section>
    </div>
  );
}
