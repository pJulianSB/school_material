import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, startAfter } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "app/lib/firebase/config";

const MATERIALS_DOCS_COLLECTION = "documents";
const MATERIALS_COLLECTION = "material";

function sanitizeFileName(name) {
  return name.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function uploadMaterialPdf(file, metadata = {}) {
  try {
    if (!file) {
      throw new Error("No se recibió archivo para cargar");
    }

    const isPdfMime = file.type === "application/pdf";
    const isPdfName = file.name.toLowerCase().endsWith(".pdf");
    if (!isPdfMime && !isPdfName) {
      throw new Error("El archivo debe ser un PDF");
    }

    const safeName = sanitizeFileName(file.name);
    const uniqueName = `${serverTimestamp()}_${safeName}`;
    const storagePath = `material/${uniqueName}`;
    const storageRef = ref(storage, storagePath);

    await uploadBytes(storageRef, file, {
      contentType: "application/pdf",
    });

    const downloadURL = await getDownloadURL(storageRef);


    const payload = {
      name: file.name,
      url: downloadURL,
      path: storagePath,
      contentType: file.type || "application/pdf",
      size: file.size || 0,
      metadata,
      creationDate: serverTimestamp(),
      active: true,
    };

    const docRef = await addDoc(collection(db, MATERIALS_DOCS_COLLECTION), payload);

    return { id: docRef.id, name: file.name, url: downloadURL };
  } catch (error) {
    console.error("Error in material service layer:", error);
    throw new Error("No fue posible cargar el documento PDF");
  }
}

export async function createMaterialService(payload) {
  try {
    if (!payload) {
      throw new Error("No hay información para crear el material");
    }
    const docRef = await addDoc(collection(db, MATERIALS_COLLECTION), payload);
    return { id: docRef.id };

  } catch (error) {
    console.error("Error in material service layer:", error);
    throw new Error("No fue posible crear el Material");
  }
}

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

export async function getMaterialLastSerial() {
  try {
    return await getNextSerialByField("serial", MATERIALS_COLLECTION);
  } 
  catch (errorBySerial) {
    console.error("Error getting last Serial in material service layer:", errorByserial);
    throw new Error("No fue posible obtener el consecutivo del material");
  }
}

export async function getMaterials({ pageSize = 10, lastVisible = null } = {}) {
  try {
    const constraints = [orderBy("serial", "desc"), limit(pageSize + 1)];
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, MATERIALS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const visibleDocs = hasMore ? docs.slice(0, pageSize) : docs;

    const items = visibleDocs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const nextLastVisible =
      visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null;

    return {
      items,
      lastVisible: nextLastVisible,
      hasMore,
    };
  } catch (error) {
    console.error("Error getting materials in material service layer:", error);
    throw new Error("No fue posible obtener los materiales");
  }
}

