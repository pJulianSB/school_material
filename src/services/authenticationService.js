import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "app/lib/firebase/config";

const auth = getAuth(app);

function mapFirebaseAuthError(error) {
  const code = error?.code || "";

  switch (code) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/user-not-found":
      return "Usuario no encontrado. Verifica correo y contraseña.";
    case "auth/wrong-password":
      return "Credenciales incorrectas. Verifica correo y contraseña.";
    case "auth/invalid-credential":
      return "Credenciales incorrectas. Verifica correo y contraseña.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Intenta nuevamente más tarde.";
    default:
      return "No fue posible iniciar sesión. Intenta nuevamente.";
  }
}

export async function signInWithEmail(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: credential.user.uid,
      email: credential.user.email,
    };
  } catch (error) {
    const mappedMessage = mapFirebaseAuthError(error);
    const mappedError = new Error(mappedMessage);
    mappedError.code = error?.code;
    throw mappedError;
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("No fue posible cerrar sesión.");
  }
}

export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function hasValidSessionToken(user) {
  try {
    if (!user) return false;
    const tokenResult = await user.getIdTokenResult();
    const expirationMs = new Date(tokenResult.expirationTime).getTime();
    return Number.isFinite(expirationMs) && expirationMs > Date.now();
  } catch (error) {
    return false;
  }
}

