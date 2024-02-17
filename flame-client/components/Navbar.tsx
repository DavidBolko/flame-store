import { Flame } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
    const {pathname} = useRouter();
  
  return (
    <nav className="flex flex-col grid-rows-1 items-center p-4 lg:grid grid-cols-3">
      <h1 className="flex text-2xl items-center"><Flame/>Store</h1>
      <ul className="flex w-full justify-center gap-4 items-center">
        <li><Link className={pathname.length==1 ? "active-link" : ""} href="/">Phones</Link></li>
        <li><Link className={pathname.includes("/laptops") ? "active-link" : ""} href="/laptops">Laptops</Link></li>
        <li><Link className={pathname.includes("/components") ? "active-link" : ""} href="/components">Components</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
