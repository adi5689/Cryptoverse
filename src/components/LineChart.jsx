import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
const { Title } = Typography;

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
  currency,
  exchangeRate,
}) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const coinPriceRupee = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    // Convert the price string to a number
    const priceNumber = parseFloat(coinHistory?.data?.history[i].price);
    // Multiply the price by the exchange rate
    const priceInRupee = priceNumber * exchangeRate;
    // Push the numeric value into the array
    coinPriceRupee.push(priceInRupee);
   }

  const priceArray = currency === "inr" ? coinPriceRupee : coinPrice;

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `${currency === "inr" ? "Rupees" : "Dollars"}`,
        data: priceArray,
        fill: false,
        backgroundColor: "#f45100",
        borderColor: "#f45100",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: {currency === "inr" ? "₹" : "$"}
            {parseFloat(
              currentPrice * (currency === "inr" ? exchangeRate : 1)
            ).toFixed(2)}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
