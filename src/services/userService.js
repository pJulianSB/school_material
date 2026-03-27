import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  limit, 
  orderBy, 
  query, 
  startAfter, 
  getDocs, 
  where, 
  getCountFromServer 
} from "firebase/firestore";
import { db } from "app/lib/firebase/config";

const USER_COLLECTION = "users";

export const createUserService = async (userData) => {
  try {
    const usersRef = collection(db, USER_COLLECTION);
    const payload = {
      ...userData,
      date_created: serverTimestamp(),
      active: true,
    };

    const docRef = await addDoc(usersRef, payload);
    return docRef.id;

  } catch (error) {
    console.error("Error in user service layer:", error);
    throw new Error("It was not possible to create the user");
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

export async function getUserLastSerial() {
  try {
    return await getNextSerialByField("serial", USER_COLLECTION);
  } 
  catch (errorBySerial) {
    console.error("Error getting last Serial in user service layer:", errorByserial);
    throw new Error("No fue posible obtener el consecutivo del usuario");
  }
}

export function buildUserFilterConstraints(filters = {}) {
  const constraints = [];
  const allowedFilterFields = [
    "name",
    "lastname",
    "cellphone",
    "email",
    "school",
    "city",
  ];

  allowedFilterFields.forEach((field) => {
    const value = filters[field];
    if (value === undefined || value === null || value === "") return;
    constraints.push(where(field, "==", value));
  });

  return constraints;
}

export function parseUsers(docs) {
  const items = docs.map((doc) => ({
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
  return items;
}

export async function getUsers({ pageSize = 10, lastVisible = null, filters = {} } = {}) {
  try {
    const constraints = [
      ...buildUserFilterConstraints(filters),
      orderBy("serial", "asc"),
    ];

    const qTotal = query(collection(db, USER_COLLECTION), ...constraints);
    const snapshot = await getCountFromServer(qTotal);
    const totalItems = snapshot.data().count;

    constraints.push(limit(pageSize + 1),);
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }

    const q = query(collection(db, USER_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs;
    const hasMore = docs.length > pageSize;
    const visibleDocs = hasMore ? docs.slice(0, pageSize) : docs;
    const items = parseUsers(visibleDocs);
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