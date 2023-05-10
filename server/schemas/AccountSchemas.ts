import {z} from "zod"

export const UserSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const addBalanceSchema = z.object({
    money: z.number(),
    userId: z.number(),
})

export const buyCoinSchema = z.object({
    userId: z.number(),
    coinName: z.string(),
    coinPrice: z.number(),
    count: z.number(),
})