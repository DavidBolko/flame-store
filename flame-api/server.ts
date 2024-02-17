import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import multer from "multer";
import { ProductType, shortPrimaryKey } from "./utils";
import { z } from "zod";
import path, { join } from "path";
import { Prisma, PrismaClient, Product } from "@prisma/client";
import { ProductSchema } from "./zod";

//App Varaibles
dotenv.config();

const app = express();
const prisma = new PrismaClient();

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    let id = shortPrimaryKey();
    while (id === "0") {
      id = shortPrimaryKey();
    }
    cb(null, id + "." + file.originalname.split(".").pop());
  },
});

var uploader = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },

  limits: {
    fileSize: 1024 * 1024,
  },
});

//using the dependancies
app.use(helmet());
app.use(cors());
app.use(express.json());

type formType = {
  id: string;
  title: string;
  price: number;
  desc: string;
  image: string;
  specs: string;
  type: string
};

app.post("/products/create", uploader.single("image"), async (req, res) => {
  const formBody: formType = req.body;
  const file = req.file;
  
  const isDataValid = ProductSchema.safeParse({
    title: formBody.title,
    price: Number(formBody.price),
    desc: formBody.desc,
    type: formBody.type
  })
  
  if (file && isDataValid) {
    try{
        const product = await prisma.product.create({
          data: {
            id: req.file?.filename.split(".").reverse().pop()!,
            title: formBody.title,
            image: req.file?.filename!,
            price: Number(formBody.price),
            desc: formBody.desc,
            specs: JSON.parse(formBody.specs) || {},
            type: formBody.type
          },
        });
        if (product) {
            return res.json(product.id);
        }
    }
    catch(e){
      return res.sendStatus(422)
    }
  }
  else{
    return res.sendStatus(400)
  }
});

app.get("/products/phones", async (req, res) =>{
  const products = await prisma.product.findMany({
    where:{
      type: ProductType.Phone
    }
  })

  return res.json(products)
})

app.get("/products", async (req, res) =>{
  const products = await prisma.product.findMany()
  return res.json(products)
})

app.get("/products/:id", async (req, res) =>{
    const product = await prisma.product.findFirst({
        where:{
          id: req.params.id
        }
    })
    
    return res.json(product)
})


app.get('/cdn', (req, res) => {
  const asset = req.query.asset
  console.log(asset);
  
  return res.sendFile(path.join(__dirname, `./uploads/${asset}`))
});

//exporting app
app.listen(5000, async () => {
  console.log(`listning on portsdt ${5000}`);
});
