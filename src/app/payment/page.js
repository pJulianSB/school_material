"use client";

import styles from "./payment.module.css";
import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "app/store/useCartStore";
import { PrimaryButton } from "app/components/ui/PrimaryButton";
import { TertiaryButton } from "app/components/ui/TertiaryButton";
import { Drawer } from "app/components/Drawer/Drawer";
import { Price } from "app/components/ui/Price";
import { Modal } from "app/components/ui/Modal";
import { Wizard } from "app/components/ui/Wizard";
import { Cart } from "app/components/icons/Cart";
import { UsersIcon } from "app/components/icons/UsersIcon";
import { CreateIcon } from "app/components/icons/CreateIcon";
import { CheckIcon } from "app/components/icons/CheckIcon";
import { UserData } from "./_components/UserData/UserData";
import { PaymentInfo } from "./_components/PaymentInfo/PaymentInfo";
import { UserReceipt } from "./_components/UserReceipt/UserReceipt";
import { PurchaseConfirmation } from "./_components/PurchaseConfirmation/PurchaseConfirmation";
import { processOrderAction } from "app/actions/checkoutActions";
import { sileo, Toaster } from "sileo";

export default function PaymentPage() {
  const router = useRouter(); 
  const [ticketNumber, setTicketNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    description: "",
    primaryLabel: "",
    onPrimaryAction: () => {},
    onCancelAction: () => {},
  });
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleConfirmGoBackCart = () => {
    router.push("/cart");
  };

  const handleCancel = () => {
    setModalData({
      title: "Cancelar compra",
      description: "El carrito de compra se mantendrá activo y podrá ser completado en otro momento.",
      primaryLabel: "Si, cancelar",
      onPrimaryAction: handleConfirmGoBackCart,
      onCancelAction: () => { setIsModalOpen(false); },
    });
    setIsModalOpen(true);
  };

  const handlePurchaseProcess = async () => {

    setErrorMessage(null);
    const items = useCartStore.getState().cartItems;
    const customerData = {
      email: 'pjulian.sb@gmail.com',
      name: 'Julian Salamanca',
      downloadLink: items[0].materials[0].material_url,
    };
    
    console.log('Purchase process');
    console.log(customerData);
    console.log(items);
    console.log('Purchase process');

    // startTransition mantiene la UI responsiva mientras el servidor trabaja
    // startTransition(async () => {
      // Llamamos al Server Action directamente
    const response = await processOrderAction(items, customerData);

    console.log('Response');
    console.log(response);
    console.log('Response');

    if (response.success) {
      // Limpiamos el Zustand localStorage y redirigimos al éxito
      useCartStore.getState().clearCart();
      router.push(`/items`);
    } else {
      setErrorMessage(response.error);
    }
    // });
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-right" />
      <section className={styles.header}>
        <h2>Proceso de compra</h2>
      </section>
      <section className={styles.card}>
        <section className={styles.wizardContainer}>
          <Wizard
            onComplete={handlePurchaseProcess}
            completeLabel="Completar Compra"
          >
            <UserData 
              icon={<UsersIcon />}
              title="Información del comprador"
              validate={() => true}
            />
            <PaymentInfo
              title="Información para el pago"
              icon={<Cart />}
              validate={() => true}
            />
            <UserReceipt
              title="Cargar comprobante"
              icon={<CreateIcon />}
              validate={() => true}
              purchaseNumber={ticketNumber}
              email={email}
            />
            <PurchaseConfirmation
              title="Confirmación"
              icon={<CheckIcon />}
              purchaseNumber={ticketNumber}
              email={email}
              validate={() => true}
            />
          </Wizard>
        </section>
        <section className={styles.rowBtns}>
          <TertiaryButton
            type="button"
            disabled={false}
            onClick={handleCancel}
          >
            Cancelar compra
          </TertiaryButton>
        </section>
      </section>
      <section className={styles.card}>
        <section className={styles.wizardContainer}>
          <h2>Resumen de compra</h2>
        </section>
      </section>
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
