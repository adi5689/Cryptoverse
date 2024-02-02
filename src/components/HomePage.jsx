import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptos from "./Cryptos";
import News from "./News";
import axios from "axios";
import { Switch } from "antd";
import './styles.css';
import '../App.css';


const { Title } = Typography;

const HomePage = () => {
  const [currency, setCurrency] = React.useState("usd");
  const [exchangeRate, setExchangeRate] = React.useState(null);
  // eslint-disable-next-line
  const [isConverting, setIsConverting] = React.useState(true);
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  const exchangeUrl = process.env.REACT_APP_EXCHANGERATE_API_URL;

  const getExchangeRate = async () => {
    const response = await axios.get(
      exchangeUrl
    );
    return response.data.rates.INR;
  };

  React.useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
      setIsConverting(false);
    };

    fetchExchangeRate();
    // eslint-disable-next-line
  }, []);
  if (isFetching) return "Loading";

  return (
    <>
      <div className="heading-contain">
        <Title level={2} className="heading">
          Global Crypto Stats
        </Title>
        <div className="currency-div">
          <p className="currency">$</p>
          <Switch
            checked={currency === "inr"}
            onChange={() => setCurrency(currency === "usd" ? "inr" : "usd")}
          />
          <p className="currency">&#8377;</p>
        </div>
      </div>
      <Row>
        <Col span={12}>
          <Statistic title="Total Crypto's" value={globalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={
              currency === "inr"
                ? "₹" +
                  millify(
                    (globalStats?.totalMarketCap * exchangeRate).toFixed(2)
                  )
                : "$" + millify(globalStats?.totalMarketCap)
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={
              currency === "inr"
                ? "₹" +
                  millify(
                    (globalStats?.total24hVolume * exchangeRate).toFixed(2)
                  )
                : "$" + millify(globalStats?.total24hVolume)
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptos" className="show-more-text">Show more</Link>
        </Title>
      </div>
      <Cryptos simplified currency={currency} exchangeRate={exchangeRate} setCurrency={setCurrency} showSwitch={false}/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Cryptocurrency News
        </Title>
        <Title level={4} className="show-more">
          <Link to="/news" className="show-more-text">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
