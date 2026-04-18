'use server';

import { sendPurchaseReceipt } from 'app/services/emailService';

/**
 * @param {Array} cartItems - The items from the Zustand store
 * @param {Object} customerData - Email, name, and payment token
 * @returns {Object} Result object with success status and optional data/error
 */

export async function processOrderAction(cartItems, customerData) {
  try {

    // Aquí deberías consultar a Firebase los IDs de los paquetes para obtener sus precios reales.
    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'The cart is empty.' };
    }

    const { email, name, paymentToken } = customerData;
    const paymentSuccessful = true; // Simulado para este ejemplo

    if (!paymentSuccessful) {
      return { success: false, error: 'Payment declined by the provider.' };
    }

    // REGISTRO EN BASE DE DATOS
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    // 4. ENVÍO DEL CORREO (Notificación asíncrona)
    const emailResult = await sendPurchaseReceipt({
      to: email,
      customerName: name,
      orderId: orderId,
      downloadLink: `https://tuplataforma.com/dashboard/downloads/${orderId}`
    });

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