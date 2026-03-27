"use client";

import styles from "./admin.module.css";
import { useEffect, useRef, useState } from "react";
import { billingColumns } from "app/utils/tableColumns";
import { sortData } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";
import { getBilling } from "app/services/billingService";
import BillingFilter from "app/components/BillingFilter/BillingFilter";

export default function BillingListPage() {
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
    billingColumns.filter((col) => col.sortable).map((col) => col.id)
  );
  const safeSortBy = sortBy && sortableColumns.has(sortBy.columnId) ? sortBy : null;
  const sortedRows = sortData(rows, safeSortBy);
  const tableRows = safeSortBy ? rows : sortedRows;

  useEffect(() => {
    let isMounted = true;

    const loadBilling = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, totalItems } = await getBilling({
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
        setErrorMessage(error?.message || "No fue posible cargar las facturas");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadBilling();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize, activeFilters]);

  const handleApplyFilters = (filters) => {
    setErrorMessage("");
    setPage(1);
    pageCursorsRef.current = {};
    console.log("filters !!!");
    console.log(filters);
    console.log("filters !!!");
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
          <h2>Lista de facturas</h2>
        </div>
        <BillingFilter
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={billingColumns}
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
        {isLoading ? <p>Cargando facturas...</p> : null}
      </section>
    </div>
  );
}
