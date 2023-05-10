import { router, publicProcedure } from "../trpc";
import AccountService from "../services/AccountService";
import { UserSchema,addBalanceSchema,buyCoinSchema } from "../schemas/AccountSchemas";
import { z } from "zod";

const accountService = new AccountService();

export const AccountRouter = router({
  createUser: publicProcedure.input(UserSchema).mutation(async (req) => {
     const {input} = req
     const res = await accountService.createUser(input)
     return res
  }),
  checkIfUserExists:publicProcedure.input(UserSchema).query(async (req) =>{
    const {input} = req
    const res = await accountService.checkIfUserExists(input.username,input.password)
    return res
  }),
  addBalanceToUser:publicProcedure.input(addBalanceSchema).mutation(async (req) =>{
    const {input} = req
    const res = await accountService.addBalanceToUser(input.money,input.userId)
    return res
  }),
  buyCoin:publicProcedure.input(buyCoinSchema).mutation(async (req) =>{
    const {input} = req
    const res = await accountService.buyCoin(input.userId,input.coinName,input.coinPrice,input.count)
    return res
  }),
  getUserCoins:publicProcedure.input(z.number()).query(async (req) =>{
    const {input} = req
    const res = await accountService.getUserCoins(input)
    return res
  }),
  getUserId:publicProcedure.input(UserSchema).query(async(req)=>{
    const {input} = req
    const res = await accountService.getUserId(input.username,input.password)
    return res
  })

});
