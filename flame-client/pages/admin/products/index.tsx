import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Product from "@/components/Product";
import { typeProduct } from "@/types"
import AdminProduct from "@/components/AdminProduct"
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function Index({ data }: {data:typeProduct[]}) {
  return (
    <div className="flex flex-col self-center items-center rounded-md border border-neutral-300">
      <div className="flex bg-neutral-200 justify-between w-full rounded-t-md p-2 text-sm">
        <h1>List of products</h1>
        <Link className="btn" href="/admin/products/create">
          <PlusIcon/>
        </Link>
      </div>
      <ul className='flex flex-col p-2'>
      {data.map((ele, index)=>{
          return(
            <li key={index}>
              <AdminProduct id={ele.id} title={ele.title} image={ele.image} price={ele.price} desc={ele.desc}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const res = await fetch(`http://localhost:5000/products`)
  const data: typeProduct[] = await res.json()
  
  return { props: {data} }
})