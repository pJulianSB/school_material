import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "app/lib/firebase/config";

const PACKAGE_COLLECTION = "packages";

/**
 * @param {Object} packageData 
 * @returns {Promise<string>} El ID del documento creado.
 */

export const createPackage = async (packageData) => {
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