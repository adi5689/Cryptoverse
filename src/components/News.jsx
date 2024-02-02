import React, { useState } from "react";
import { Typography, Row, Col,  Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import './styles.css';
const { Text, Title } = Typography;


const News = ({ simplified }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cryptoNews } = useGetCryptoNewsQuery();

  const newsToShow =
    cryptoNews?.data && Array.isArray(cryptoNews.data)
      ? simplified
        ? cryptoNews.data.slice(0, 6)
        : cryptoNews.data
      : [];

  const filteredNews = newsToShow.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // console.log(filteredNews);

  //  console.log(newsToShow);
  //  console.log(cryptoNews);
  //  if(!cryptoNews?.value) return 'Loading...';

  return (
    <>
      {!simplified && (
        <Col span={24}>
          <input
            className="news-search"
            type="text"
            placeholder="Search your crypto here!"
            onChange={handleChange}
            value={searchTerm}
          />
        </Col>
      )}
      <Row gutter={[24, 24]}>
        {filteredNews &&
          filteredNews.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.title}
                    </Title>
                    <img src={news?.thumbnail} alt={i} />
                  </div>
                  <p>
                    {news.description > 50
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                  <Text>{moment(news.createdAt).startOf("ss").fromNow()}</Text>
                </a>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default News;
