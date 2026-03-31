"use client";

import styles from "./cart.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "app/store/useCartStore";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { Drawer } from "app/components/Drawer/Drawer";
import { Price } from "app/components/ui/Price";
import { PackageDetail } from "app/components/PackageDetail/PackageDetail";
import { PackageItems } from "./_components/PackageItems/PackageItems";
import { sileo, Toaster } from "sileo";

export default function CartPage() {
  const router = useRouter();
  const [ticketNumber, setTicketNumber] = useState("0001");
  const [packageItems, setPackageItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [packageData, setPackageData] = useState({
    id: "",
    title: "",
    description: "",
    grade: "",
    subject: "",
    price: "",
    materials: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setPackageItems(useCartStore.getState().cartItems);
    setTotalPrice(useCartStore.getState().totalPrice);
  }, []);

  const handleCancel = () => {
    useCartStore.getState().clearCart();
    setPackageItems([]);
    setTotalPrice(0);
    sileo.success({ title: "Carrito vaciado" });
    router.push("/");
  };

  const handlePurchaseProcess = () => {
    console.log("Iniciar proceso de compra");
  };

  const handleRemovePackage = (id, price) => {
    useCartStore.getState().removeFromCart(id);
    const priceUpdated = parseFloat(useCartStore.getState().totalPrice) - parseFloat(price);
    useCartStore.getState().updateTotalPrice(priceUpdated);
    setPackageItems(packageItems.filter((packageItem) => packageItem.id !== id));
    setTotalPrice(priceUpdated);
    sileo.success({ title: "Paquete removido correctamente" });
  };

  const handleViewDetails = (packageData) => {
    setPackageData(packageData)
    setIsDrawerOpen(true);
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <section className={styles.header}>
        <h2>Carrito de compra</h2>
        <div className={styles.ticketNumberContainer}>
          <h3>Número de compra</h3> 
          <span className={styles.ticketNumber}>TC-{ticketNumber}</span>
        </div>
      </section>
      <section className={styles.card}>
        <section className={styles.packageItemsContainer}>
          <h3 className={styles.subtitle}>Paquetes seleccionados:</h3>
          <PackageItems
            packageItems={packageItems}
            onRemove={handleRemovePackage}
            onViewDetails={handleViewDetails}
          />
          <p className={styles.totalPrice}>Precio Total:  <Price value={totalPrice}/></p>
        </section>
        <section className={styles.rowBtns}>
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={handlePurchaseProcess}
            >
            Completar compra
          </PrimaryButton>
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={() => router.push("/items")}
            >
            Continuar comprando
          </PrimaryButton>
          <TertiaryButton
            type="button"
            disabled={false}
            onClick={handleCancel}
            >
              Cancelar
          </TertiaryButton>
        </section>
      </section>
      <Drawer
        isOpen={isDrawerOpen}
        title="Detalle del paquete"
        onClose={handleCloseDrawer}
      >
        <PackageDetail packageData={packageData} />
      </Drawer>
    </div>
  );
}
