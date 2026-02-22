"use client";

import { useState } from "react";
import styles from "./material.module.css";
import { Select } from "app/components/ui/Select";
import { TextArea } from "app/components/ui/TextArea";

const TIPO_MATERIAL_OPTIONS = [
  { value: "malla", label: "Malla" },
  { value: "actividad", label: "Actividad" },
  { value: "taller", label: "Taller" },
];

export default function MaterialPage() {
  const [tipoMaterial, setTipoMaterial] = useState("");
  const [descripcion, setDescripcion] = useState("");

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <h2>Detalle del Material</h2>
        <section className={styles.formMaterial}>
          <label htmlFor="tipo-material" className={styles.field}>
            Tipo de material
            <Select
              id="tipo-material"
              name="tipoMaterial"
              options={TIPO_MATERIAL_OPTIONS}
              value={tipoMaterial}
              onChange={(e) => setTipoMaterial(e.target.value)}
            />
          </label>
          <label htmlFor="descripcion-material" className={styles.field}>
            Descripción
            <TextArea
              id="descripcion-material"
              name="descripcion"
              rows={5}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el material..."
            />
          </label>
        </section>
      </section>
    </div>
  );
}

