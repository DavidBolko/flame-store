import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Product from "@/components/Product";
import { useCDN } from "@/utils";
import { typeProduct } from "@/types";

export default function Index({ data }: {data:typeProduct[]}) {
  console.log(data[0].title);
  
  return (
    <>
      <ul className='p-6 pt-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
      {data.map((ele, index)=>{
          return(
            <li key={index}>
              <Product image={ele.image} desc={ele.desc} price={ele.price} title={ele.title}/>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const res = await fetch(`http://localhost:5000/products/phones`)
  const data: typeProduct[] = await res.json()
  
  return { props: {data} }
})