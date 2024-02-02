import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Switch } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import axios from "axios";
import "./styles.css";

const Cryptos = ({ simplified, currency: propCurrency, exchangeRate: propExchangeRate, showSwitch = true }) => {
 const count = simplified ? 10 : 100;
 const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
 const [crypto, setCrypto] = useState([]);
 const [currency, setCurrency] = useState("usd"); // Default currency is USD
 const [exchangeRate, setExchangeRate] = useState(null); // Default exchange rate is null
 const [searchTerm, setSearchTerm] = useState('');
 const exchangeUrl = process.env.REACT_APP_EXCHANGERATE_API_URL;

// Search functionality
useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCrypto(filteredData);

}, [cryptosList, searchTerm]);

// Currency conversion
 const getExchangeRate = async () => {
    const response = await axios.get(
      exchangeUrl
    );
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

 if(isFetching) return "Loading...";
 return (
    <>
        {showSwitch && (
            <div className="search-cryptos">
            <Input placeholder="Search your fav crypto!" onChange={(e) => setSearchTerm(e.target.value)} className="search-crypto"/>
          <div className="currency-div">
            <p className="currency">$</p>
            <Switch checked={currency === "inr"} onChange={handleSwitchChange} />
            <p className="currency">&#8377;</p>
          </div>
          </div>
        )}
      
      <Row gutter={[32, 32, 10]} className="crypto-card-container">
        {crypto?.map((curr, i) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={curr.uuid}>
            <Link key={curr.uuid} to={`/crypto/${curr.uuid}`}>
              <Card
                title={`${curr.rank}. ${curr.name}`}
                extra={
                 <img src={curr.iconUrl} className="crypto-image" alt="img" />
                }
                hoverable
              >
                <p>
                 Price: {(propCurrency || currency) === "inr" ? "₹" : "$"}{" "}
                 {millify(
                    curr.price * ((propCurrency || currency) === "inr" ? (propExchangeRate || exchangeRate) : 1)
                 )}
                </p>
                <p>
                 Market Cap: {(propCurrency || currency) === "inr" ? "₹" : "$"}{" "}
                 {millify(
                    curr.marketCap * ((propCurrency || currency) === "inr" ? (propExchangeRate || exchangeRate) : 1)
                 )}
                </p>
                <p>Daily Change: {millify(curr.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
 );
};

export default Cryptos;
