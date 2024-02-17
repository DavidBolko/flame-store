import { typeProduct } from "@/types"
import { useCDN } from "@/utils"
import { ShoppingBasketIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const Product = (props: typeProduct) =>{
    return(
        <div className="flex flex-col items-center min-h-64 p-4 border border-gray-300 rounded-md">
            <Link href="#"><Image className="pb-4 object-cover" alt="" width={120} height={120} src={useCDN(props.image)}/></Link>
            <div className="flex flex-col gap-2 border-t  pt-1 border-gray-300">
                <Link href="#">
                    <div className="flex justify-between">
                        <p className="font-medium">Iphone 14</p>
                        <p className="font-bold">300€</p>
                    </div>
                    <p className="text-xs text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo cumque a! Officia, eaque eligendi!</p>
                </Link>
                <button className="btn">
                    <ShoppingBasketIcon className="w-4 h-4"/>
                    Add To Cart
                </button>
            </div>
        </div>
    )

}

export default Product