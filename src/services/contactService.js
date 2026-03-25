import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "app/lib/firebase/config";

const EMAILS_COLLECTION = "emails";

export async function createEmailService(payload) {
  try {
    if (!payload) {
      throw new Error("No hay información para crear el email");
    }

    const data = {
      name: payload.name,
      lastname: payload.lastname,
      email: payload.email,
      cellphone: payload.cellphone,
      message: payload.message,
      allowWhatsappContact: payload.allowWhatsappContact,
      allowPrivacyPolicy: payload.allowPrivacyPolicy,
      status: "pending",
      creation_date: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, EMAILS_COLLECTION), data);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error in email service layer:", error);
    throw new Error("No fue posible registrar el email");
  }
}

