'use server';

import { sendPurchaseReceipt } from 'app/services/emailService';

export async function processOrderAction(cartItems, customerData) {
  try {

    // Aquí deberías consultar a Firebase los IDs de los paquetes para obtener sus precios reales.
    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'The cart is empty.' };
    }

    const { email, name, downloadLink } = customerData;
    const paymentSuccessful = true; // Simulado para este ejemplo

    if (!paymentSuccessful) {
      return { success: false, error: 'Payment declined by the provider.' };
    }

    // REGISTRO EN BASE DE DATOS
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    console.log('Checkout process started');
    console.log(orderId);
    // 4. ENVÍO DEL CORREO (Notificación asíncrona)
    const emailResult = await sendPurchaseReceipt({
      to: email,
      customerName: name,
      orderId: orderId,
      downloadLink: downloadLink
    });

    console.log(emailResult);
    console.log('Checkout process ended');

    if (!emailResult.success) {
      console.warn(`[WARNING] Order ${orderId} completed, but receipt email failed.`);
    }

    return { success: true, orderId: orderId };

  } catch (error) {
    console.error('[ERROR] Checkout process failed:', error);
    return { 
      success: false, 
      error: 'An unexpected error occurred while processing your order. Please try again.' 
    };
  }
}