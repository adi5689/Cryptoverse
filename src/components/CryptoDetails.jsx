import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select, Switch } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  const [currency, setCurrency] = useState("usd"); // Default currency is USD
  const [exchangeRate, setExchangeRate] = useState(null); // Default exchange rate is null

  const exchangeUrl = process.env.REACT_APP_EXCHANGERATE_API_URL;

  useEffect(() => {
    // This effect will run whenever timeperiod changes
    // No need to define a separate async function here
  }, [timePeriod]);

  // Currency conversion
  const getExchangeRate = async () => {
    const response = await axios.get(exchangeUrl);
    return response.data.rates.INR;
  };

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
    };

    fetchExchangeRate();
    // eslint-disable-next-line 
  }, []);

  const handleSwitchChange = (checked) => {
    setCurrency(checked ? "inr" : "usd");
  };

  if (isFetching) return "Loading...";

  const time = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `${currency === "inr" ? "₹" : "$"}${" "}${(
        cryptoDetails?.price * (currency === "inr" ? exchangeRate : 1)
      ).toFixed(2)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `${currency === "inr" ? "₹" : "$"}${" "} ${(
        cryptoDetails?.["24hVolume"] * (currency === "inr" ? exchangeRate : 1)
      ).toFixed(2)}  `,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `${currency === "inr" ? "₹" : "$"}${" "} ${(
        cryptoDetails?.marketCap * (currency === "inr" ? exchangeRate : 1)
      ).toFixed(2)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${currency === "inr" ? "₹" : "$"}${" "}${(
        cryptoDetails?.allTimeHigh?.price *
        (currency === "inr" ? exchangeRate : 1)
      ).toFixed(2)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `${currency === "inr" ? "₹" : "$"}${" "}${(
        cryptoDetails?.supply?.total * (currency === "inr" ? exchangeRate : 1)
      ).toFixed(2)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${currency === "inr" ? "₹" : "$"}${" "}${(
        cryptoDetails?.supply?.circulating *
        (currency === "inr" ? exchangeRate : 1)
      ).toFixed(2)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol})
        </Title>
        <p>
          || Real-time price tracking || Real-time Market Cap and Supply
          Statistics ||
        </p>
      </Col>
      <Select
        defaultValue="24h"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {/* line chart */}
      <LineChart
        coinHistory={coinHistory}
        currency={currency}
        exchangeRate={exchangeRate}
        currentPrice={cryptoDetails.price}
        coinName={cryptoDetails.name}
      />

      <div className="currency-div">
        <p className="currency">$</p>
        <Switch checked={currency === "inr"} onChange={handleSwitchChange} />
        <p className="currency">&#8377;</p>
      </div>
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails?.name} in terms of
              money.
            </p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails?.name} in terms of
              numbers.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}?
          </Title>
          {cryptoDetails &&
            cryptoDetails.description &&
            HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.url}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
