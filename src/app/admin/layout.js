import { SideBar } from "app/components/SideBar/SideBar";
import { adminRoutes } from "app/app/routes";
import styles from "./layout.module.css";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.adminLayout}>
      <SideBar routes={adminRoutes} />
      <main className={styles.adminContent}>{children}</main>
    </div>
  );
}
