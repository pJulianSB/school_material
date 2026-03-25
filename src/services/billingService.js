import { collection, addDoc, serverTimestamp, limit, orderBy, query, startAfter, getDocs, where } from "firebase/firestore";
import { db } from "app/lib/firebase/config";
import { SUBJECTS_MAP, GRADES_MAP, PACKAGE_STATUS_MAP } from "app/utils/selectOptions";

const BILLING_COLLECTION = "billing";

export const createBillingService = async (billingData) => {
  try {
    if (!billingData) {
      throw new Error("No hay información para crear la factura");
    }

    const data = {
      ...billingData,
      creation_date: serverTimestamp(),
      active: true
    };
    const docRef = await addDoc(collection(db, BILLING_COLLECTION), data);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error in billing service layer:", error);
    throw new Error("It was not possible to create the billing");
  }
};

async function getNextSerialByField(fieldName, collectionName) {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, orderBy(fieldName, "desc"), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return 1;
  }

  const lastDoc = querySnapshot.docs[0].data();
  const lastSerial = Number(lastDoc?.[fieldName]);

  if (!Number.isFinite(lastSerial)) {
    return 1;
  }

  return lastSerial + 1;
}

export async function getBillingLastSerial() {
  try {
    return await getNextSerialByField("serial", BILLING_COLLECTION);
  } 
  catch (errorBySerial) {
    console.error("Error getting last Serial in billing service layer:", errorByserial);
    throw new Error("No fue posible obtener el consecutivo de la factura");
  }
}

export function parseBilling(invoices) {
  const items = invoices.map((doc) => ({
    id: doc.id,
    serial: doc.data().serial,
    date_purchase: doc.data().date_purchase.toDate().toLocaleDateString(),
    ticket_id: doc.data().ticket_id,
    status: doc.data().status,
    notes: doc.data().notes,
    total_cost: doc.data().total_cost,
    total_packages: doc.data().total_packages,
    packages: doc.data().packages,
    name: doc.data().user.name,
    lastname: doc.data().user.lastname,
    email: doc.data().user.email,
    phone: doc.data().user.phone,
    user_id: doc.data().user.id,
    invoice_id: doc.data().invoice.id,
    invoice_url: doc.data().invoice.url,
    invoice_name: doc.data().invoice.name,
  }));
  return items;
}

export async function getBilling({ pageSize = 10, lastVisible = null } = {}) {
  try {
    const constraints = [
      orderBy("serial", "asc"),
      limit(pageSize + 1),
    ];
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, BILLING_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const visibleDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const items = parseBilling(visibleDocs);
    const nextLastVisible =
      visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null;

    return {
      items,
      lastVisible: nextLastVisible,
      hasMore,
    };
  } catch (error) {
    console.error("Error getting billing in billing service layer:", error);
    throw new Error("No fue posible obtener las facturas");
  }
}

export async function getBillingById(billingId = "") {
  try {
    const q = query(collection(db, BILLING_COLLECTION), where("id", "==", billingId));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const items = parseBilling(docs);
    return { items: items };

  } catch (error) {
    console.error("Error getting billing in billing service layer:", error);
    throw new Error("No fue posible obtener la factura");
  }
}