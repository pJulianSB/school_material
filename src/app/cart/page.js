"use client";

import styles from "./cart.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "app/store/useCartStore";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { Drawer } from "app/components/Drawer/Drawer";
import { Price } from "app/components/ui/Price";
import { Modal } from "app/components/ui/Modal";
import { PackageDetail } from "app/components/PackageDetail/PackageDetail";
import { PackageItems } from "./_components/PackageItems/PackageItems";
import { sileo, Toaster } from "sileo";

export default function CartPage() {
  const router = useRouter();
  const [ticketNumber, setTicketNumber] = useState("0001");
  const [packageItems, setPackageItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [packageData, setPackageData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageToRemove, setPackageToRemove] = useState(null);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    primaryLabel: "",
    onPrimaryAction: () => {},
    onCancelAction: () => {},
  });

  useEffect(() => {
    setPackageItems(useCartStore.getState().cartItems);
    setTotalPrice(useCartStore.getState().totalPrice);
  }, []);

  const handleConfirmClearCart = () => {
    useCartStore.getState().clearCart();
    setPackageItems([]);
    setTotalPrice(0);
    sileo.success({ title: "Carrito vaciado" });
    router.push("/");
  }

  const handleCancel = () => {
    setModalData({
      title: "Cancelar compra",
      description: "El carrito de compra se limpiará, esta acción no podrá ser revertida.",
      primaryLabel: "Si, cancelar",
      onPrimaryAction: handleConfirmClearCart,
      onCancelAction: () => { setIsModalOpen(false); },
    });
    setIsModalOpen(true);
  };

  const handlePurchaseProcess = () => {
    console.log("Iniciar proceso de compra");
  };

  const handleRemovePackage = (id, price) => {
    setPackageToRemove({ id, price });
    setModalData({
      title: "Remover paquete del carrito de compra.",
      description: "¿Esta seguro que desea remover el paquete del carrito de compra?",
      primaryLabel: "Remover",
      onPrimaryAction: handleConfirmRemovePackage,
      onCancelAction: handleCancelRemovePackage,
    });
    setIsModalOpen(true);
  };

  const handleConfirmRemovePackage = () => {
    if (!packageToRemove) return;

    const { id, price } = packageToRemove;
    useCartStore.getState().removeFromCart(id);
    const priceUpdated = Math.max(0, parseFloat(totalPrice) - parseFloat(price));
    useCartStore.getState().updateTotalPrice(priceUpdated);
    setPackageItems((prevItems) =>
      prevItems.filter((packageItem) => packageItem.id !== id)
    );
    setTotalPrice(priceUpdated);
    sileo.success({ title: "Paquete removido correctamente" });
    setPackageToRemove(null);
    setIsModalOpen(false);
  };

  const handleCancelRemovePackage = () => {
    setPackageToRemove(null);
    setIsModalOpen(false);
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
          <PrimaryButton
            type="button"
            className={styles.primaryButton}
            onClick={() => router.push("/payment")}
          >
            Proceso de pago
          </PrimaryButton>
        </section>
      </section>
      <Drawer
        isOpen={isDrawerOpen}
        title="Detalle del paquete"
        onClose={handleCloseDrawer}
      >
        <PackageDetail packageData={packageData} />
      </Drawer>
      <Modal
        isOpen={isModalOpen}
        title={modalData.title}
        primaryLabel={modalData.primaryLabel}
        onPrimaryAction={modalData.onPrimaryAction}
        onCancelAction={modalData.onCancelAction}
      >
        <p>{modalData.description}</p>
      </Modal>
    </div>
  );
}
