import { Flame } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const AdminNavbar = () => {
    const {pathname} = useRouter();
    
  return (
    <nav className="grid place-items-center gap-2 p-4 lg:grid-cols-[1fr,2fr,1fr]">
      <h1 className="flex lg:place-self-start text-2xl items-center"><Flame/>Store</h1>
      <ul className="flex w-fit items-center justify-center  gap-2 lg:mt-0">
        <li><Link className={pathname.split("/").length < 3 ? "active-link" : "link"} href="/admin">Dashboard</Link></li>
        <li><Link className={pathname.includes("/products") ? "active-link" : "link"} href="/admin/products">Products</Link></li>
        <li><Link className={pathname.includes("/laptops") ? "active-link" : "link"} href="/admin/orders">Purchase orders</Link></li>
        <li><Link className={pathname.includes("/components") ? "active-link" : "link"} href="/admin/components">Components</Link></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
