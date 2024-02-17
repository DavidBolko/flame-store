import { typeProduct } from "@/types"
import { useCDN } from "@/utils"
import { PenIcon, ShoppingBasketIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const AdminProduct = (props: typeProduct) =>{
    return(
        <div className="grid  p-4 border-gray-300 max-w-[700px] rounded-md">
            <Link className="flex" href={`/products/${props.id}`}><Image className="pb-4 object-cover" alt="" width={48} height={48} src={useCDN("633646514.png")}/></Link>
            <div className="flex gap-2 pt-1 border-gray-300">
                <Link href={`/products/${props.id}`}>
                    <div className="flex justify-between">
                        <p className="font-medium">Iphone 14</p>
                        <p className="font-bold">300€</p>
                    </div>
                    <p className="text-xs text-gray-600 text-justify">{props.desc}</p>
                </Link>
                <div className="flex flex-col gap-1">
                    <button className="btn-secondary">
                        <PenIcon className="w-3 h-3"/>
                    </button>
                    <button className="btn-danger">
                        <TrashIcon className="w-3 h-3"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminProduct