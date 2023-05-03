import { create } from 'zustand'
import axios from 'axios'
const homeStore = create((set) => ({
    coins:[],
    fetchCoins: async ()=>{
        const res  = await axios.get("https://api.coingecko.com/api/v3/search/trending")
        const coins = res.data.map((coin:any) =>{
            return{
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc
            }
        })
        console.log(typeof coins)
    }
}))