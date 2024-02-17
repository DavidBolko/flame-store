import { z } from "zod";

export const ProductSchema = z.object({
    title: z.string().min(3),
    price: z.number(),
    desc: z.string(),
    type: z.string()
})