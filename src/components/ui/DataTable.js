"use client";

import React from "react";
import styles from "./DataTable.module.css";

export function DataTable({
  columns = [],
  data = [],
  page = 1,
  pageSize = 10,
  totalItems = 0,
  pageSizeOptions = [10, 15, 20],
  sortBy = null,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  className,
}) {
   const totalPages =
     pageSize > 0 ? Math.max(1, Math.ceil(totalItems / pageSize || 1)) : 1;
   const currentPage = Math.min(Math.max(page, 1), totalPages);
 
   const startIndex =
     totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
   const endIndex =
     totalItems === 0
       ? 0
       : Math.min(currentPage * pageSize, totalItems);
 
   const handleSortClick = (column) => {
     if (!column.sortable || !onSortChange) return;
 
     let next = null;
     if (!sortBy || sortBy.columnId !== column.id) {
       next = { columnId: column.id, direction: "asc" };
     } else if (sortBy.direction === "asc") {
       next = { columnId: column.id, direction: "desc" };
     } else {
       next = null;
     }
 
     onSortChange(next);
   };
 
   const getAriaSort = (column) => {
     if (!column.sortable || !sortBy || sortBy.columnId !== column.id) {
       return "none";
     }
     return sortBy.direction === "asc" ? "ascending" : "descending";
   };
 
   const handlePrevPage = () => {
     if (!onPageChange || currentPage <= 1) return;
     onPageChange(currentPage - 1);
   };
 
   const handleNextPage = () => {
     if (!onPageChange || currentPage >= totalPages) return;
     onPageChange(currentPage + 1);
   };
 
   const handlePageSizeChange = (event) => {
     const newSize = Number(event.target.value) || pageSize;
     if (onPageSizeChange) {
       onPageSizeChange(newSize);
     }
   };
 
   const tableClassName = [styles.table, className]
     .filter(Boolean)
     .join(" ");

  const getCellValue = (column, row) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }
    if (column.field) {
      return row[column.field];
    }
    return row[column.id];
  };

  const getCellContent = (column, row, rowIndex) => {
    if (typeof column.renderCell === "function") {
      return column.renderCell(row, { rowIndex, column });
    }

    const value = getCellValue(column, row);
    return value != null ? String(value) : "";
  };
 
   return (
     <div className={styles.tableWrapper}>
       <table className={tableClassName}>
         <thead>
          <tr className={styles.headerRow}>
             {columns.map((column) => {
               const isButtonColumn = column.type === "button";
               const isSortable = Boolean(
                 !isButtonColumn && column.sortable && onSortChange
               );
               const ariaSort = getAriaSort(column);
               const isActiveSort =
                 sortBy && sortBy.columnId === column.id && !!sortBy.direction;
               const sortIcon = !isSortable
                 ? ""
                 : !isActiveSort
                 ? "⇅"
                 : sortBy.direction === "asc"
                 ? "▲"
                 : "▼";
 
               return (
                 <th
                   key={column.id}
                   className={styles.headerCell}
                   style={column.width ? { width: column.width } : undefined}
                   aria-sort={isSortable ? ariaSort : undefined}
                   scope="col"
                 >
                   {isSortable ? (
                     <button
                       type="button"
                       className={styles.sortButton}
                       onClick={() => handleSortClick(column)}
                     >
                       <span>{column.header}</span>
                       <span className={styles.sortIcon}>{sortIcon}</span>
                     </button>
                   ) : (
                     column.header
                   )}
                 </th>
               );
             })}
           </tr>
         </thead>
         <tbody>
           {data.length === 0 ? (
             <tr className={styles.emptyRow}>
               <td className={styles.cell} colSpan={columns.length}>
                 Sin registros
               </td>
             </tr>
           ) : (
             data.map((row, rowIndex) => (
               <tr key={row.id ?? rowIndex} className={styles.bodyRow}>
                 {columns.map((column) => {
                  const isButtonColumn = column.type === "button";
                  const cellClassName = isButtonColumn
                    ? `${styles.cell} ${styles.cellButton}`
                    : styles.cell;
                  const cellContent = getCellContent(column, row, rowIndex);

                   return (
                    <td key={column.id} className={cellClassName}>
                      {cellContent}
                    </td>
                   );
                 })}
               </tr>
             ))
           )}
         </tbody>
       </table>
       <div className={styles.pagination}>
         <div className={styles.pageInfo}>
           {totalItems === 0
             ? "Sin registros"
             : `Mostrando ${startIndex}–${endIndex} de ${totalItems}`}
         </div>
         <div className={styles.pageControls}>
           <button
             type="button"
             className={styles.pageButton}
             onClick={handlePrevPage}
             disabled={currentPage <= 1}
           >
             Anterior
           </button>
           <span>
             Página {currentPage} de {totalPages}
           </span>
           <button
             type="button"
             className={styles.pageButton}
             onClick={handleNextPage}
             disabled={currentPage >= totalPages}
           >
             Siguiente
           </button>
           <label>
             Tamaño:
             <select
               className={styles.pageSizeSelect}
               value={pageSize}
               onChange={handlePageSizeChange}
             >
               {pageSizeOptions.map((size) => (
                 <option key={size} value={size}>
                   {size}
                 </option>
               ))}
             </select>
           </label>
         </div>
       </div>
     </div>
   );
 }
 
