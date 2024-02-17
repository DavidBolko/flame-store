import { GetServerSideProps } from "next"
import { typeProduct } from "@/types"
import Link from "next/link"
import { MapPinIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"


export default function Index({ data }: {data:typeProduct[]}) {
  return (
    <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col rounded-md border p-6 border-neutral-200">
            <p className="font-medium">Income</p>
            <div className="flex items-center gap-2 pt-4">
                <TrendingUpIcon className="text-emerald-600 w-4 h-4"/>
                <p className="text-lg font-semibold">3458€</p>
            </div>
            <Link href="#" className="text-sm text-neutral-200 underline">See orders</Link>
        </div>
        <div className="flex flex-col rounded-md border p-6 border-neutral-200">
            <p className="font-medium">Expenses</p>
            <div className="flex items-center gap-2 pt-4">
                <TrendingDownIcon className="text-red-600 w-4 h-4"/>
                <p className="text-lg font-semibold">3458€</p>
            </div>
            <Link href="#" className="text-sm text-neutral-200 underline">See expenses</Link>
        </div>
        <div className="flex flex-col row-span-2 gap-2 rounded-md border p-6 border-neutral-200">
            <p className="font-medium">Latest orders</p>
            <div className="flex justify-between bg-neutral-100 p-2 rounded-md">
                <div className="flex flex-col">
                    <p>Iphone 14</p>
                    <span className="flex items-center text-xs text-neutral-500"><MapPinIcon className="w-3 h-3"/>Staškov 517</span>
                </div>
                <p className="text-emerald-700 bg-emerald-400/55 text-sm rounded-md p-2">Delivering</p>
            </div>
            <div className="flex justify-between bg-neutral-100 p-2 rounded-md">
                <div className="flex flex-col">
                    <p>Iphone 14</p>
                    <span className="flex items-center text-xs text-neutral-500"><MapPinIcon className="w-3 h-3"/>Staškov 517</span>
                </div>
                <p className="text-emerald-700 bg-emerald-400/55 text-sm rounded-md p-2">Delivering</p>
            </div>
            <div className="flex justify-between bg-neutral-100 p-2 rounded-md">
                <div className="flex flex-col">
                    <p>Iphone 14</p>
                    <span className="flex items-center text-xs text-neutral-500"><MapPinIcon className="w-3 h-3"/>Staškov 517</span>
                </div>
                <p className="text-emerald-700 bg-emerald-400/55 text-sm rounded-md p-2">Delivering</p>
            </div>
            <Link href="#" className="text-sm text-neutral-200 underline">See orders</Link>
        </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (async (context) => {
  const res = await fetch(`http://localhost:5000/products/phones`)
  const data: typeProduct[] = await res.json()
  
  return { props: {data} }
})