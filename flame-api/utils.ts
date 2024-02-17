export const shortPrimaryKey = () =>{
    return (Number((new Date().getTime()*Math.floor(Math.random()*9)).toString().split('').sort(()=>.5 - Math.random()).join(''))%1000000000).toString();
}


export enum ProductType {
    Phone = "Phone",
    Laptop = "Laptop",
    Component = "Component"
}