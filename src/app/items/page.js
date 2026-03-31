"use client";

import styles from "./items.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "app/components/Drawer/Drawer";
import { PackageDetail } from "./_components/PackageDetail/PackageDetail";
import { PackageCard } from "./_components/PackageCard/PackageCard";
import { ItemsFilter } from "./_components/ItemsFilter/ItemsFilter";
import { Loading } from "app/components/ui/Loading";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { getPackages } from "app/services/packageService";

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
  const pageCursorsRef = useRef({});
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [packageData, setPackageData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    price: "",
    materials: []
  });
  const [page, setPage] = useState(1);
  const [packagesList, setPackagesList] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [isResetQuery, setIsResetQuery] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      setErrorMessage("");
      
      try {
        const previousCursor = page > 1 ? pageCursorsRef.current[page - 1] : null;
        const { items, lastVisible, hasMore } = await getPackages({
          pageSize: 4,
          lastVisible: previousCursor || null,
          filters: activeFilters || {},
        });

        if (isResetQuery) {
          setPackagesList(items);
        } else {
          setPackagesList([...packagesList, ...items]);
        }
        setHasMore(hasMore);
        setIsLoading(false);
        setIsResetQuery(false);
        pageCursorsRef.current[page] = lastVisible;

      }
      catch (error) {
        setErrorMessage(error?.message || "No fue posible cargar los paquetes");
        setPackagesList([]);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, [activeFilters, page]);

  const handleApplyFilters = (filters) => {
    if (Object.keys(filters).length === 0) return;
    setPage(1);
    setIsResetQuery(true);
    setPackagesList([]);
    pageCursorsRef.current = {};
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    if (Object.keys(activeFilters).length === 0) return;
    setErrorMessage("");
    setPage(1);
    setIsResetQuery(true);
    setPackagesList([]);
    pageCursorsRef.current = {};
    setActiveFilters({});
  };

  const handleLoadMore = () => {
    setPage(page + 1);
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
      <section className={styles.packagesContainerWrapper}>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <section className={styles.packagesContainer}>
          {packagesList.map((packageInfo) => (
            <PackageCard 
              key={packageInfo.id}
              packageData={packageInfo}
              onAddToCart={handleAddPackageToCart}
              onViewDetail={handlePackageDetail}
                />
          ))}
        </section>
        <section className={styles.loadingContainer}>
          {isLoading 
            ? hasMore 
              ? <Loading label="Cargando más paquetes..." size={40} /> 
              : <Loading label="Cargando paquetes..." size={40} /> 
            : null
          }
          {hasMore && !isLoading
            ? (
              <section className={styles.infiniteScrollContainer}>
                <PrimaryButton
                  type="button"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  >
                  Cargar más
                </PrimaryButton>
              </section>
              ) 
            : null
          }
          {!hasMore && !isLoading ? <h3 className={styles.noMorePackages}>No hay más paquetes disponibles...</h3> : null}
        </section>
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