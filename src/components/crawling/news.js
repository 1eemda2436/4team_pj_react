import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    text-align: center;
    margin-top: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
`;

const NewsList = styled.ul`
    list-style: none;
    padding: 0;
`;

const NewsItem = styled.li`
    margin: 15px 0;
`;

const NewsLink = styled.a`
    text-decoration: none;
    color: #007bff;

    &:hover {
        text-decoration: underline;
    }
`;

function NewsCrawling() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/api/news");

                const newsData = response.data;
                setNews(newsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <br/>
            <Title>네이버 랭킹 뉴스</Title>
            <br/>
            <br/>
            <NewsList>
                {news.map((item, index) => (
                    <NewsItem key={index}>
                        <NewsLink href={item.url} target="_blank" rel="noopener noreferrer">
                            {item.title}
                        </NewsLink>
                    </NewsItem>
                ))}
            </NewsList>
        </Container>
    );
}

export default NewsCrawling;
