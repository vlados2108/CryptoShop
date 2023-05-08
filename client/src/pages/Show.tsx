import React, { useEffect, PureComponent, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

export default function Show() {
  const params = useParams();
  const [graphData, setGraphData] = useState([]);
  const [coinData, setCoinData] = useState(Object(undefined));
  // const [name,setName] = useState('')
  useEffect(() => {
    fetchData(params.id!);

    return ()=>{  
      reset()
    }
  }, []);

  const fetchData = async (id: String) => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=60`
      ),
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`
      ),
    ]);

    const graphData = graphRes.data.prices.map((price: [number, number]) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-ru");
      return {
        Date: date,
        Price: p,
      };
    });
    setGraphData(graphData);
    setCoinData(dataRes.data);
    console.log(dataRes);
  };

  const reset = ()=>{
    setGraphData([])
    setCoinData(Object(undefined))
  }
  

  return (
    <div>
      <Header back />
      {(Object.entries(coinData).length != 0) && <><header className="show-header">
        <img src={coinData.image.large} />
        <h2>
          {coinData.name} ({coinData.symbol})
        </h2>
      </header>
      <div className="width">
        <div className="show-graph">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="show-details">
        <div className="width">
          <h2>Details</h2>
          <div className="show-details-row">
            <h3>Market cap rank</h3>
            <span>{coinData.market_cap_rank}</span>
          </div>
          <div className="show-details-row">
            <h3>24h high</h3>
            <span>{coinData.market_data.high_24h.usd}</span>
          </div>
          <div className="show-details-row">
            <h3>24h low</h3>
            <span>{coinData.market_data.low_24h.usd}</span>
          </div>
          <div className="show-details-row">
            <h3>Circulating supply</h3>
            <span>{coinData.market_data.circulating_supply}</span>
          </div>
          <div className="show-details-row">
            <h3>Current price</h3>
            <span>{coinData.market_data.current_price.usd}</span>
          </div>
          <div className="show-details-row">
            <h3>1y change</h3>
            <span>
              {coinData.market_data.price_change_percentage_1y.toFixed(2)}%
            </span>
          </div>
        </div>
      </div></>}
      
    </div>
  );
}
