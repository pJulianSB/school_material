"use client";

import React, { useState } from "react";
import { Input } from "app/components/ui/Input";
import { Select } from "app/components/ui/Select";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { BILLING_STATUS_OPTIONS } from "app/utils/selectOptions";
import styles from "./BillingFilter.module.css";

const EMPTY_VALUE = "";
const STATUS_OPTIONS = [{ value: EMPTY_VALUE, label: "" }, ...BILLING_STATUS_OPTIONS];

function sanitizeFilters(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => String(value || "").trim() !== "")
  );
}

export default function BillingFilter({ onApplyFilters, onClearFilters }) {
  const [filters, setFilters] = useState({
    ticket_id: EMPTY_VALUE,
    phone: EMPTY_VALUE,
    email: EMPTY_VALUE,
    status: EMPTY_VALUE,
  });

  const handleChange = (name) => (event) => {
    const { value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    const nextFilters = sanitizeFilters({
      ticket_id: filters.ticket_id,
      phone: filters.phone,
      email: filters.email,
      status: filters.status,
    });
    if (onApplyFilters) onApplyFilters(nextFilters);
  };

  const handleClear = () => {
    const emptyFilters = {
      ticket_id: EMPTY_VALUE,
      phone: EMPTY_VALUE,
      email: EMPTY_VALUE,
      status: EMPTY_VALUE,
    };
    setFilters(emptyFilters);
    if (onClearFilters) onClearFilters();
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersRow}>
        <div className={styles.inputsGroup}>
          <div className={styles.field}>
            <label htmlFor="ticket_id">Número de Ticket</label>
            <Input
              id="ticket_id"
              name="ticket_id"
              value={filters.ticket_id}
              onChange={handleChange("ticket_id")}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Celular</label>
            <Input
              id="phone"
              name="phone"
              value={filters.phone}
              onChange={handleChange("phone")}
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
