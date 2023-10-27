import axios from "axios";

function Home({ news }) {
    return (
        <div>
        <h1>네이버 랭킹 뉴스</h1>
        <ul>
            {news.map((title, index) => (
            <li key={index}>{title}</li>
            ))}
        </ul>
        </div>
    );
}

Home.getInitialProps = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:5000/api/news"); // 포트를 5000으로 수정
        const news = response.data;
        return { news };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { news: [] };
    }
};

export default Home;
