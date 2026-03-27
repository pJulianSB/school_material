import {
  addDoc, 
  collection, 
  getDocs, 
  getCountFromServer, 
  limit, 
  orderBy, 
  query, 
  serverTimestamp, 
  startAfter, 
  where 
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "app/lib/firebase/config";
import { TYPE_MATERIAL_MAP, SUBJECTS_MAP, GRADES_MAP, MATERIAL_STATUS_MAP } from "app/utils/selectOptions";

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
    const timestamp = Date.now();
    const uniqueName = `${timestamp}_${safeName}`;
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
      content_type: file.type || "application/pdf",
      size: file.size || 0,
      metadata,
      creation_date: serverTimestamp(),
      active: true,
    };

    const docRef = await addDoc(collection(db, MATERIALS_DOCS_COLLECTION), payload);

    return { id: docRef.id, path: storagePath, url: downloadURL };
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

    const data = {
      ...payload,
      creation_date: serverTimestamp(),
      active: true
    };
    const docRef = await addDoc(collection(db, MATERIALS_COLLECTION), data);
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

export function parseMaterials(docs) {
  const items = docs.map((doc) => ({
    id: doc.id,
    serial: doc.data().serial,
    description: doc.data().description,
    type: TYPE_MATERIAL_MAP[doc.data().type],
    subject: SUBJECTS_MAP[doc.data().subject],
    grade: GRADES_MAP[doc.data().grade],
    total_packages: doc.data().total_packages,
    material_url: doc.data().material?.url || doc.data().material_url || "",
    material_id: doc.data().material?.id || doc.data().material_id || "",
    material_name: doc.data().material?.name || doc.data().material_name || "",
    status: MATERIAL_STATUS_MAP[doc.data().status],
  }));
  return items;
}

export async function getMaterials({ pageSize = 10, lastVisible = null, filters = {} } = {}) {
  try {
    const constraints = [
      ...buildMaterialFilterConstraints(filters),
      orderBy("serial", "asc"),
    ];

    const qTotal = query(collection(db, MATERIALS_COLLECTION), ...constraints);
    const snapshot = await getCountFromServer(qTotal);
    const totalItems = snapshot.data().count;

    constraints.push(limit(pageSize + 1),);
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, MATERIALS_COLLECTION), ...constraints);
    
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const visibleDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const items = parseMaterials(visibleDocs);
    const nextLastVisible = visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null;

    return {
      items,
      lastVisible: nextLastVisible,
      hasMore,
      totalItems,
    };
  } catch (error) {
    console.error("Error getting materials in material service layer:", error);
    throw new Error("No fue posible obtener los materiales");
  }
}

function buildMaterialFilterConstraints(filters = {}) {
  const constraints = [];
  const allowedFilterFields = [
    "type",
    "description",
    "subject",
    "grade",
    "status",
  ];

  allowedFilterFields.forEach((field) => {
    const value = filters[field];
    if (value === undefined || value === null || value === "") return;
    constraints.push(where(field, "==", value));
  });

  return constraints;
}

export async function getMaterialFiltered(filters = {}) {
  try {
    const constraints = [ ...buildMaterialFilterConstraints(filters) ];
    const q = query(collection(db, MATERIALS_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const items = parseMaterials(docs);
    return { items: items };

  } catch (error) {
    console.error("Error getting materials in material service layer:", error);
    throw new Error("No fue posible obtener los materiales");
  }
}
