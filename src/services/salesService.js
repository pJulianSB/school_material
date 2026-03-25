import { collection, addDoc, serverTimestamp, limit, orderBy, query, startAfter, getDocs } from "firebase/firestore";
import { db } from "app/lib/firebase/config";

const BILLING_COLLECTION = "billing";

export const createSalesService = async (salesData) => {
  try {
    const salesRef = collection(db, BILLING_COLLECTION);
    const payload = {
      ...salesData,
      creationDate: serverTimestamp(),
    };

    const docRef = await addDoc(salesRef, payload);
    return docRef.id;

  } catch (error) {
    console.error("Error in sales service layer:", error);
    throw new Error("It was not possible to create the sales");
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

export async function getSalesLastSerial() {
  try {
    return await getNextSerialByField("serial", BILLING_COLLECTION);
  } 
  catch (errorBySerial) {
    console.error("Error getting last Serial in sales service layer:", errorByserial);
    throw new Error("No fue posible obtener el consecutivo de las ventas");
  }
}

export async function getSales({ pageSize = 10, lastVisible = null } = {}) {
  try {
    const constraints = [orderBy("serial", "asc"), limit(pageSize + 1)];
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, BILLING_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const visibleDocs = hasMore ? docs.slice(0, pageSize) : docs;

    const items = visibleDocs.map((doc) => ({
      id: doc.id,
      serial: doc.data().serial,
      date: doc.data().date_created.toDate().toLocaleDateString(),
      name: doc.data().name,
      lastname: doc.data().lastname,
      phone: doc.data().cellphone,
      email: doc.data().email,
      school: doc.data().school,
      city: doc.data().city,
      province: doc.data().province,
      sales: doc.data().sales_qty,
      totalSales: doc.data().sales_total,
      active: doc.data().active,
    }));

    const nextLastVisible =
      visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null;

    return {
      items,
      lastVisible: nextLastVisible,
      hasMore,
    };
  } catch (error) {
    console.error("Error getting sales in sales service layer:", error);
    throw new Error("No fue posible obtener las ventas");
  }
}