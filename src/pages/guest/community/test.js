import React, { useEffect, useState } from 'react';
import axios from 'axios';

function NewsComponent() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        // Python API 엔드포인트 URL 설정
        const apiUrl = '/api/news';  // 이 URL은 Flask API의 경로와 일치해야 합니다

        axios.get(apiUrl)
        .then(response => {
            setNewsData(response.data); // JSON 형식의 데이터를 가져옴
            console.log("값보짜!!", response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
        <h1>네이버 뉴스 스탠드</h1>
        <ul>
            {newsData.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul>
        </div>
    );
}

export default NewsComponent;
