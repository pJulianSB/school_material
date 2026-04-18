"use client";

import React, { useState } from "react";
import { Select } from "app/components/ui/Select";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import {
  SUBJECTS_OPTIONS,
  GRADES_OPTIONS,
  PACKAGE_STATUS_OPTIONS,
} from "app/utils/selectOptions";
import styles from "./PackageFilter.module.css";

const EMPTY_VALUE = "";
const SUBJECT_OPTIONS = [{ value: EMPTY_VALUE, label: "" }, ...SUBJECTS_OPTIONS];
const GRADE_OPTIONS = [{ value: EMPTY_VALUE, label: "" }, ...GRADES_OPTIONS];
const STATUS_OPTIONS = [{ value: EMPTY_VALUE, label: "" }, ...PACKAGE_STATUS_OPTIONS];

function sanitizeFilters(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => String(value || "").trim() !== "")
  );
}

export default function PackageFilter({ onApplyFilters, onClearFilters }) {
  const [filters, setFilters] = useState({
    subject: EMPTY_VALUE,
    grade: EMPTY_VALUE,
    status: EMPTY_VALUE,
  });

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const nextFilters = sanitizeFilters({
      subject: filters.subject,
      grade: filters.grade,
      status: filters.status,
    });
    if (onApplyFilters) onApplyFilters(nextFilters);
  };

  const handleClear = () => {
    const emptyFilters = {
      subject: EMPTY_VALUE,
      grade: EMPTY_VALUE,
      status: EMPTY_VALUE,
    };
    setFilters(emptyFilters);
    if (onClearFilters) onClearFilters();
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersRow}>
        <div className={styles.selectorsGroup}>
          <div className={styles.field}>
            <label htmlFor="subject">Área</label>
            <Select
              id="subject"
              name="subject"
              value={filters.subject}
              onChange={handleChange("subject")}
              options={SUBJECT_OPTIONS}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="grade">Grado</label>
            <Select
              id="grade"
              name="grade"
              value={filters.grade}
              onChange={handleChange("grade")}
              options={GRADE_OPTIONS}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="status">Estado</label>
            <Select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleChange("status")}
              options={STATUS_OPTIONS}
            />
          </div>
        </div>
        <div className={styles.actionsGroup}>
          <PrimaryButton type="button" onClick={handleApply}>
            Aplicar Filtrar
          </PrimaryButton>
          <TertiaryButton type="button" onClick={handleClear}>
            Limpiar Filtros
          </TertiaryButton>
        </div>
      </div>
    </div>
  );
}
