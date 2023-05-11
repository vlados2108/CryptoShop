import { PrismaClient, User } from "@prisma/client";
import { UserType } from "../interfaces/Types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../config";
import axios from "axios";

const prisma = new PrismaClient();

const generateAccessToken = (id: number) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export default class AccountService {
  async createUser(data: UserType) {
    try {
      const temp = await prisma.user.findFirst({
        where: { username: data.username },
      });
      if (!temp) {
        const hashPassword = bcrypt.hashSync(data.password, 7);
        data.password = hashPassword;
        const user = await prisma.user.create({
          data,
        });
        return user;
      } else {
        console.log("User with this username already exists");
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  }

  async checkIfUserExists(name: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { username: name },
    });
    if (!user) {
      console.log("no user with such login found");
      return null;
    }
    const validPassword = bcrypt.compareSync(password, user!.password);
    if (!validPassword) {
      console.log("not valid password");
      return null;
    }
    const token = generateAccessToken(user?.id);
    return user;
  }

  async getUserBalance(userId: number) {
    const res = await prisma.user.findFirst({
      where: { id: userId },
    });
    return res!.balance;
  }

  async addBalanceToUser(money: number, userId: number) {
    const us = await prisma.user.findUnique({
      where: { id: userId },
    });
    const user = await prisma.user.update({
      where: { id: userId },
      data: { balance: us!.balance + money },
    });
    return user;
  }

  async getUserId(name: string, pass: string) {
    const res = await prisma.user.findFirst({
      where: {
        username: name,
        password: pass,
      },
    });
    return res?.id;
  }

  async buyCoin(
    userId: number,
    coinName: string,
    coinPrice: number,
    count: number = 1
  ) {
    const ifCoinExist = await prisma.coin.findFirst({
      where: { name: coinName },
    });
    var coin = Object(undefined);
    if (ifCoinExist == undefined) {
      coin = await prisma.coin.create({ data: { name: coinName } });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (user!.balance >= coinPrice) {
      const newBalance = user!.balance - coinPrice * count;
      await prisma.user.update({
        where: { id: userId },
        data: { balance: newBalance },
      });
      const temp = await prisma.user_Coins.findFirst({
        where: {
          coin_id: ifCoinExist != undefined ? ifCoinExist.id : coin.id,
          user_id: userId,
        },
      });
      var res = Object(undefined);
      if (temp == undefined) {
        res = await prisma.user_Coins.create({
          data: {
            coin_id: ifCoinExist != undefined ? ifCoinExist.id : coin.id,
            user_id: userId,
            count: count,
          },
        });
      } else {
        const tempCount = temp.count;
        res = await prisma.user_Coins.update({
          where: {
            user_id_coin_id: {
              coin_id: ifCoinExist != undefined ? ifCoinExist.id : coin.id,
              user_id: userId,
            },
          },
          data: { count: tempCount + count },
        });
      }

      return temp;
    }
    console.log("not enough money");
  }

  async getUserCoins(userId: number) {
    const res = await prisma.user_Coins.findMany({
      where: { user_id: userId },
    });
    const coins = await Promise.all(
      res.map(async (el) => {
        const coin = await prisma.coin.findFirst({
          where: {
            id: el.coin_id,
          },
        });
        const coinInfo = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin?.name}?localization=false&market_data=true`
        );
        return {
          name: coin?.name,
          count: el.count,
          image: coinInfo.data.image.large,
          price: coinInfo.data.market_data.current_price.usd,
        };
      })
    );
    return coins;
  }

  async sellCoin(
    coinName: string,
    userId: number,
    count: number,
    coinPrice: number
  ) {
    const coin = await prisma.coin.findFirst({
      where: { name: coinName },
    });

    const res = await prisma.user_Coins.findUnique({
      where: {
        user_id_coin_id: { coin_id: coin!.id, user_id: userId },
      },
    });

    if (res!.count > count) {
      const newCount = res!.count - count;
      await prisma.user_Coins.update({
        where: { user_id_coin_id: { coin_id: coin!.id, user_id: userId } },
        data: { count: newCount },
      });
    } else if ((res!.count = count)) {
      await prisma.user_Coins.delete({
        where: {
          user_id_coin_id: { coin_id: coin!.id, user_id: userId },
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const sum = coinPrice * count;
    const newBalance = user!.balance + sum;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: { balance: newBalance },
    });
  }

  /*Close db connection*/
  async disconnect() {
    await prisma.$disconnect().catch((e) => this.handleError(e));
  }

  /*Handling errors*/
  async handleError(e: Error) {
    console.error(e);
    await prisma.$disconnect();
  }
}
