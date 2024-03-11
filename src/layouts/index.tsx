import { Link, Outlet } from "umi";
import styles from "./index.less";

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">拖拽界面</Link>
        </li>
        <li>
          <Link to="/app2">拖拽排序</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
