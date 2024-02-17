import DragDrop from "@/components/DragDrop";
import SpecificationTable from "@/components/SpecificationTable";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useRef, useState } from "react";

const AddProductPage = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [desc, setDesc] = useState("")
    const [type, setType] = useState("")
    const router = useRouter()
    const [image, setImage] = useState<File>()
    const [specs, setSpecs] = useState([{name:"dasdas", value: "dasds"}])

    const handleSubmit = async(e: FormEvent) =>{
      e.preventDefault()
      const formData = new FormData()
      formData.append("title", title)
      formData.append("price", price)
      formData.append("desc",  desc)
      formData.append("image", image as Blob)
      formData.append("specs", JSON.stringify(specs))
      formData.append("type", type)
      
      const fetch = await axios.post("/api/products/create", formData)
      if(fetch.status == 200){
        router.replace(`/products/${fetch.data}`,)
      }
    } 
  
    return (
      <>
        <form onSubmit={handleSubmit} className="flex justify-center  items-center w-full" encType="multipart/form-data">
          <div className="flex flex-col w-[700px] items-center gap-1 pr-2 pl-2">
            <div className="flex flex-col md:flex-row gap-1 w-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-1 flex-col">
                  <DragDrop update={setImage}/>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="">Title</label>
                    <input onChange={(e)=>setTitle(e.target.value)} name="title"/>
                    <label htmlFor="">Price</label>
                    <input onChange={(e)=>setPrice(e.target.value)} name="price"/>
                  </div>
                </div>
                <label htmlFor="">Title</label>
                <select onChange={(e)=>setType(e.target.value)}>
                  <option value="Phone">Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Component">Component</option>
                </select>
                <textarea onChange={(e)=>setDesc(e.target.value)} name="desc"/>
              </div>
            </div>
            <SpecificationTable updateJson={setSpecs}/>
          </div>
          <button type="submit" className="fixed bottom-6 right-6 btn p-1.5 text-base">
            Add product
          </button>
        </form>
      </>
    );
  };
  
  export default AddProductPage;
  