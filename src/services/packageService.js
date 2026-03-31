import {
  collection, 
  addDoc, 
  updateDoc,
  doc,
  serverTimestamp, 
  limit, 
  orderBy, 
  query, 
  startAfter, 
  getDoc,
  getDocs, 
  where, 
  getCountFromServer 
} from "firebase/firestore";
import { db } from "app/lib/firebase/config";
import { SUBJECTS_MAP, GRADES_MAP, PACKAGE_STATUS_MAP } from "app/utils/selectOptions";

const PACKAGE_COLLECTION = "packages";

export const createPackageService = async (packageData) => {
  try {
    if (!packageData) {
      throw new Error("No hay información para crear el paquete");
    }

    const data = {
      ...packageData,
      creation_date: serverTimestamp(),
      active: true
    };
    const docRef = await addDoc(collection(db, PACKAGE_COLLECTION), data);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error in package service layer:", error);
    throw new Error("It was not possible to create the package");
  }
};

export async function updatePackageService(packageId, payload) {
  try {
    if (!packageId || !payload) {
      throw new Error("No hay información para actualizar el paquete");
    }

    const data = {
      ...payload,
      update_date: serverTimestamp(),
    };

    await updateDoc(doc(db, PACKAGE_COLLECTION, packageId), data);
    return { id: packageId };

  } catch (error) {
    console.error("Error in package service layer:", error);
    throw new Error("No fue posible actualizar el paquete");
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

export async function getPackageLastSerial() {
  try {
    return await getNextSerialByField("serial", PACKAGE_COLLECTION);
  } 
  catch (errorBySerial) {
    console.error("Error getting last Serial in package service layer:", errorByserial);
    throw new Error("No fue posible obtener el consecutivo del paquete");
  }
}

function buildPackageFilterConstraints(filters = {}) {
  const constraints = [];
  const allowedFilterFields = [
    "title",
    "description",
    "subject",
    "grade",
    "status",
    "price",
    "serial",
    "active",
  ];

  allowedFilterFields.forEach((field) => {
    const value = filters[field];
    if (value === undefined || value === null || value === "") return;
    constraints.push(where(field, "==", value));
  });

  return constraints;
}

export function parsePackages(docs) {
  const items = docs.map((doc) => ({
    id: doc.id,
    serial: doc.data().serial,
    date: doc.data().creation_date.toDate().toLocaleDateString(),
    title: doc.data().title,
    description: doc.data().description,
    subject: SUBJECTS_MAP[doc.data().subject],
    grade: GRADES_MAP[doc.data().grade],
    status: PACKAGE_STATUS_MAP[doc.data().status],
    price: doc.data().price,
    total_documents: doc.data().total_documents,
    materials: doc.data().materials,
  }));
  return items;
}

export async function getPackages({ pageSize = 10, lastVisible = null, filters = {} } = {}) {
  try {
    const constraints = [
      ...buildPackageFilterConstraints(filters),
      orderBy("serial", "asc"),
    ];

    const qTotal = query(collection(db, PACKAGE_COLLECTION), ...constraints);
    const snapshot = await getCountFromServer(qTotal);
    const totalItems = snapshot.data().count;

    
    constraints.push(limit(pageSize + 1),);
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, PACKAGE_COLLECTION), ...constraints);

    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const visibleDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const items = parsePackages(visibleDocs);
    const nextLastVisible = visibleDocs.length > 0 ? visibleDocs[visibleDocs.length - 1] : null;

    return {
      items,
      lastVisible: nextLastVisible,
      hasMore,
      totalItems,
    };
  } catch (error) {
    console.error("Error getting packages in package service layer:", error);
    throw new Error("No fue posible obtener los paquetes");
  }
}

export async function getPackageById(packageId = "") {
  try {
    if (!packageId) {
      throw new Error("No se recibió el id del paquete");
    }
    const docRef = doc(db, PACKAGE_COLLECTION, packageId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }
    const data = docSnap.data();
    return { id: docSnap.id, ...data };
  }
  catch (error) {
    console.error("Error getting package by id in package service layer:", error);
    throw new Error("No fue posible obtener el paquete");
  }
}
