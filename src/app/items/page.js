"use client";

import styles from "./items.module.css";
import { useState } from "react";
import { Drawer } from "app/components/Drawer/Drawer";
import { PackageDetail } from "./_components/PackageDetail/PackageDetail";
import { PackageCard } from "./_components/PackageCard/PackageCard";
import { ItemsFilter } from "./_components/ItemsFilter/ItemsFilter";

const MOCK_PACKAGE_DATA = {
  title: "Paquete 1",
  description: "Descripción del paquete 1",
  grade: "Grado 1",
  subject: "Matemáticas",
  price: 100000,
  materials: [
    {
      id: 1,
      type: "Material 1",
      description: "Descripción del material 1",
    },
    {
      id: 2,
      type: "Material 2",
      description: "Descripción del material 2",
    },
  ]
}


export default function ItemsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    price: "",
    materials: []
  });

  const handleApplyFilters = (filters) => {
    console.log("Aplicar filtros", filters);
  };

  const handleClearFilters = () => {
    console.log("Limpiar filtros");
  };

  const handleAddPackageToCart = () => {
    console.log("Agregar al carrito");
  };

  const handlePackageDetail = (packageInfo) => {
    setIsDrawerOpen(true);
    setPackageData({
      title: packageInfo.title,
      description: packageInfo.description,
      grade: packageInfo.grade,
      subject: packageInfo.subject,
      price: packageInfo.price,
      materials: packageInfo.materials
    });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <h2>Descubre nuestros productos</h2>
      </section>
      <section className={styles.filterContainer}>
        <ItemsFilter 
          onApplyFilters={handleApplyFilters} 
          onClearFilters={handleClearFilters} 
        />
      </section>
      <section className={styles.packagesContainer}>
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
        <PackageCard 
          packageData={MOCK_PACKAGE_DATA}
          onAddToCart={handleAddPackageToCart}
          onViewDetail={handlePackageDetail}
        />
      </section>
      <Drawer
        isOpen={isDrawerOpen}
        title="Detalle del paquete"
        onClose={handleCloseDrawer}
        hasAction={true}
        actionLabel="Agregar al carrito"
        onAction={handleAddPackageToCart}
      >
        <PackageDetail packageData={packageData} />
      </Drawer>
    </div>
  );
}