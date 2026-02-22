"use client";

import { useState } from "react";
import styles from "./packageList.module.css";
import { packageColumns } from "app/utils/tableColumns";
import { MOCK_PACKAGES } from "app/utils/mockData";
import { filterData, sortData, getPageSlice } from "app/utils/tableUtils";
import { DataTable } from "app/components/ui/DataTable";

export default function PackageListPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [filters, setFilters] = useState({});

  const filtered = filterData(MOCK_PACKAGES, filters);
  const sorted = sortData(filtered, sortBy);
  const { totalItems, start, pageData } = getPageSlice(sorted, page, pageSize);

  return (
    <div className={styles.page}>
      <section className={styles.card}>
          
        <h2>Lista de Paquetes</h2>
        <DataTable
          columns={packageColumns}
          data={pageData}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          sortBy={sortBy}
          filters={filters}
          onSortChange={setSortBy}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
          onFilterChange={(nextFilters) => {
            setFilters(nextFilters);
            setPage(1);
          }}
        />

      </section>
    </div>
  );
}

