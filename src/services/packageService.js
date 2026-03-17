import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "app/lib/firebase/config";

const PACKAGE_COLLECTION = "packages";

export const createPackageService = async (packageData) => {
  try {
    const packagesRef = collection(db, PACKAGE_COLLECTION);
    const payload = {
      ...packageData,
      creationDate: serverTimestamp(),
      active: true
    };

    const docRef = await addDoc(pa, payload);
    return docRef.id;

  } catch (error) {
    console.error("Error in package service layer:", error);
    throw new Error("It was not possible to create the package");
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

export async function getPackageLastSerial() {
  try {
    return await getNextSerialByField("serial", PACKAGE_COLLECTION);
  } 
  catch (errorBySerial) {
    console.error("Error getting last Serial in package service layer:", errorByserial);
    throw new Error("No fue posible obtener el consecutivo del paquete");
  }
}

export async function getPackages({ pageSize = 10, lastVisible = null } = {}) {
  try {
    const constraints = [orderBy("serial", "desc"), limit(pageSize + 1)];
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, PACKAGE_COLLECTION), ...constraints);
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
    console.error("Error getting packages in package service layer:", error);
    throw new Error("No fue posible obtener los paquetes");
  }
}