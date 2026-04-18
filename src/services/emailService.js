// src/services/emailService.js
import { Resend } from 'resend';
import { PurchaseReceiptEmail } from 'app/emails/PurchaseReceiptEmail';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendPurchaseReceipt = async ({ to, customerName, orderId, downloadLink }) => {
  try {
    const data = await resend.emails.send({
      from: 'APPEducativa <noreply@appeducativa.com>',
      to: [to],
      subject: `Compra #${orderId} lista para descargar`,
      react: PurchaseReceiptEmail({ customerName, orderId, downloadLink }),
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};