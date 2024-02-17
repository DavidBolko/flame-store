import { useState } from "react";
import Image from "next/image"

type props = {
    update: Function
}

const DragDrop = (props: props) =>{
    const [image, setImage] = useState<string | null>(null)
    const handleDrop = (file: File) =>{
        setImage(URL.createObjectURL(file))
        props.update(file)
    }
    return(
        <div className="flex justify-center items-center relative w-full min-h-[300px] border">
            <input className="absolute z-10 h-full" required onChange={(e)=>handleDrop(e.target.files![0])} type="file" name="image" id="image" />
            {image
            ? <img src={image} className="h-fit max-h-[300px]" alt="Nahraný obrázok" />
            : <p className="z-0 absolute ">Drag image to upload!</p>
            }
        </div>
    )
}

export default DragDrop;