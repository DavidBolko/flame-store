import { PlusIcon } from "lucide-react";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";

type props = {
  updateJson?: Function
  jsonData?: string
}

const SpecificationTable:FC<props> = (props) => {
  if(!props.jsonData){
    const [count, setCount] = useState(1)
    const [keys, setKeys] = useState<string[]>([])
    const [values, setValues] = useState<string[]>([])

    const update = (index: number, key:string, value:string) =>{
      const _keys = [...keys]
      const _values = [...values]

      _keys[index] = key
      _values[index] = value

      setKeys(_keys)
      setValues(_values)

      let json: {[key: string]: string} = keys.reduce((obj: {[key: string]: string}, key: string, index: number) => {
        if (key && values[index]) {
          obj[key] = values[index];
        }
        return obj;
      }, {});
      
      props.updateJson!(json)
    }

    let fields = []
    for(let i = 0; i < count; i++){
      fields.push(
        <li>
          <RowInput keyId={i} update={update}/>
        </li>
      )
    }
  
    return (
      <div className="flex flex-col gap-2 w-full border border-gray-300 rounded-md text-sm">
        <div className="bg-gray-100 col-span-2 p-1">
          <button type="button" className="btn" onClick={()=>setCount(count+1)}>
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="font-semibold p-2 pt-0">
          <ul className="flex flex-col gap-2">
            {fields}
          </ul>
        </div>
      </div>
    );
  }

  
  return (
    <div className="flex flex-col gap-2 w-full border border-gray-300 rounded-md text-sm">
      <div className="bg-gray-100 col-span-2 p-1">
        <p>Technical Specification</p>
      </div>
      <div className="font-semibold p-2 pt-0">
        <ul className="flex flex-col gap-2">
          {Object.entries(JSON.parse(props.jsonData)).map(([key, value]:[key:string, value:any], index)=>(
            <RowInput keyId={index} _key={key} value={value}/>
          ))}
        </ul>
      </div>
    </div>
  );
};

type rowProps = {
  keyId: number,
  update?: Function
  value?: string,
  _key?: string
};

const RowInput: FC<rowProps> = (rowProps) => {
  if(rowProps.update){
    const [key, setKey] = useState("")
    const [value, setValue] = useState("")
    useEffect(()=>{
      rowProps.update!(rowProps.keyId, key, value)
    }, [key, value])
    return (
      <div className="flex w-full gap-2">
        <input type="text" className="p-1" onChange={(e)=>setKey(e.target.value)} name={`key${rowProps.keyId}`}/>
        <input type="text" className="p-1" onChange={(e)=>setValue(e.target.value)} name={`value${rowProps.keyId}`}/>
      </div>
    );
  }
  
  return (
    <div className="flex w-full gap-2">
      <input type="text" className="p-1" disabled aria-disabled="true" value={rowProps._key}/>
      <input type="text" className="p-1" disabled aria-disabled="true" value={rowProps.value}/>
    </div>
  );
  
};
export default SpecificationTable;

