import AdminLayout from "@/components/AdminLayout";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if(router.pathname.includes("admin")){
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    )
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}


