"use client";

import styles from "./materialList.module.css";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { documentColumns } from "app/utils/tableColumns";
import { DataTable } from "app/components/ui/DataTable";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { getMaterials } from "app/services/materialService";
import { sortData } from "app/utils/tableUtils";
import MaterialFilter from "./_components/MaterialFilter/MaterialFilter";

export default function MaterialListPage() {
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
    documentColumns.filter((col) => col.sortable).map((col) => col.id)
  );
  const safeSortBy = sortBy && sortableColumns.has(sortBy.columnId) ? sortBy : null;
  const sortedRows = sortData(rows, safeSortBy);
  const tableRows = safeSortBy ? rows : sortedRows;

  useEffect(() => {
    let isMounted = true;
    const loadMaterials = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, totalItems } = await getMaterials({
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
        setErrorMessage(error?.message || "No fue posible cargar los materiales");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadMaterials();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize, activeFilters]);

  const handleCreateMaterial = () => {
    router.push("/admin/material");
  };

  const handleApplyFilters = async (filters) => {
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
          <h2>Lista de documentos</h2>
          <PrimaryButton
            type="button"
            onClick={handleCreateMaterial}
            >
            Crear material
          </PrimaryButton>
        </div>
        <MaterialFilter
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <DataTable
          columns={documentColumns}
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
        {isLoading ? <p>Cargando materiales...</p> : null}
      </section>
    </div>
  );
}

