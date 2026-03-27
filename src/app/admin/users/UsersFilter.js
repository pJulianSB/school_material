"use client";

import React, { useState } from "react";
import { Input } from "app/components/ui/Input";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import styles from "./UsersFilter.module.css";

const EMPTY_VALUE = "";

function sanitizeFilters(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => String(value || "").trim() !== "")
  );
}

export default function UsersFilter({ onApplyFilters, onClearFilters }) {
  const [filters, setFilters] = useState({
    cellphone: EMPTY_VALUE,
    email: EMPTY_VALUE,
    school: EMPTY_VALUE,
  });

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const nextFilters = sanitizeFilters({
      cellphone: filters.cellphone,
      email: filters.email,
      school: filters.school,
    });
    if (onApplyFilters) onApplyFilters(nextFilters);
  };

  const handleClear = () => {
    const emptyFilters = {
      cellphone: EMPTY_VALUE,
      email: EMPTY_VALUE,
      school: EMPTY_VALUE,
    };
    setFilters(emptyFilters);
    if (onClearFilters) onClearFilters();
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersRow}>
        <div className={styles.inputsGroup}>
          <div className={styles.field}>
            <label htmlFor="cellphone">Celular</label>
            <Input
              id="cellphone"
              name="cellphone"
              value={filters.cellphone}
              onChange={handleChange("cellphone")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              value={filters.email}
              onChange={handleChange("email")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="school">Colegio</label>
            <Input
              id="school"
              name="school"
              value={filters.school}
              onChange={handleChange("school")}
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
