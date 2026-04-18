import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  limit, 
  orderBy, 
  query, 
  startAfter, 
  getDocs 
} from "firebase/firestore";
import { 
  getDownloadURL, 
  uploadBytes, 
  ref 
} from "firebase/storage";
import { db, storage } from "app/lib/firebase/config";

const SALES_SUPPORT_COLLECTION = "sales_support";
const SALES_SUPPORT_DOCS_COLLECTION = "documents";

function sanitizeFileName(name) {
  return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function uploadSaleSupport(file, metadata = {}) {
  try {
    if (!file) {
      throw new Error("No se recibió archivo para cargar");
    }

    const isPdfMime = file.type === "application/pdf";
    const isImageMime = file.type.startsWith("image/");
    const isPdfName = file.name.toLowerCase().endsWith(".pdf");
    const isImageName = file.name.toLowerCase().endsWith(".jpg") || file.name.toLowerCase().endsWith(".jpeg") || file.name.toLowerCase().endsWith(".png") || file.name.toLowerCase().endsWith(".gif") || file.name.toLowerCase().endsWith(".bmp") || file.name.toLowerCase().endsWith(".tiff") || file.name.toLowerCase().endsWith(".ico") || file.name.toLowerCase().endsWith(".webp");
    if (!isPdfMime && !isPdfName && !isImageMime && !isImageName) {
      throw new Error("El archivo debe ser un PDF o una imagen");
    }

    const safeName = sanitizeFileName(file.name);
    const timestamp = Date.now();
    const uniqueName = `${timestamp}_${safeName}`;
    const storagePath = `billing/${uniqueName}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file, {
      contentType: isPdfMime ? "application/pdf" : "image/jpeg",
    });

    const downloadURL = await getDownloadURL(storageRef);

    const payload = {
      name: file.name,
      url: downloadURL,
      path: storagePath,
      content_type: file.type || (isPdfMime ? "application/pdf" : "image/jpeg"),
      size: file.size || 0,
      metadata,
      creation_date: serverTimestamp(),
      active: true,
    };

    const docRef = await addDoc(collection(db, SALES_SUPPORT_DOCS_COLLECTION), payload);

    return { id: docRef.id, path: storagePath, url: downloadURL };
  } catch (error) {
    console.error("Error in sales support service layer:", error);
    throw new Error("No fue posible cargar el documento PDF o imagen");
  }
}

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
