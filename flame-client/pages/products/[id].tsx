import SpecificationTable from '@/components/SpecificationTable'
import { useCDN } from '@/utils'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'

type dataType = {
    title: string,
    price: number,
    desc: string,
    image: string,
    specs: JSON[]
}

export default function Page(product: dataType) {
    return (
    <>
        <p>{product.title}</p>
        <p>{product.price}</p>
        <p>{product.desc}</p>
        <img src={useCDN(product.image)}/>
        <SpecificationTable jsonData={JSON.stringify(product.specs)}/>
    </>
    )
}


export const getServerSideProps: GetServerSideProps = (async (context) => {
    const res = await fetch(`http://localhost:5000/products/${context.query.id}`)
    const product: dataType = await res.json()

    return { props: product }
})