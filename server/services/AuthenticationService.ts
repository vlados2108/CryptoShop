import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { secret } from "../config";
const prisma = new PrismaClient();

const generateAccessToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, secret, { expiresIn: "1h" });
  };

export default class AuthenticationService{

    async login(login:string,password:string){
        const user = await prisma.user.findFirst({
            where:{username:login}
        })
        if (!user){
            console.log("There is no such user")
        }
        // const validPassword = bcrypt.compareSync(password, user?.password);
        // if (!validPassword)
        //     console.log("Wrong password")
        // const token = generateAccessToken(user?.id)


    }

}