import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const community = () => {
    const router = useRouter();
    return(
        <MainComponent>
        <Title>자유게시판</Title>
        <Category>카테고리</Category>
        <Button onClick={() => router.push('community/BoardWrite')}>글쓰기</Button>

        <BoardItem>
        <div>
        <div>작성자</div>
        <div>조회수</div>
        </div>
        <div>사진</div>
        <div>
        <BoardItemTitle onClick={() => router.push('community/BoardDetails')}>
            제목
        </BoardItemTitle>
        <div>글내용</div>
        </div>
    </BoardItem>

    <div>뉴스 API</div>
    </MainComponent>
    )
}

export default community;

community.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};


const MainComponent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
    font-size: 24px;
`;

const Category = styled.div`
    font-weight: bold;
    margin-top: 10px;
`;

const Button = styled.div`
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    display: inline-block;
    cursor: pointer;
    margin: 10px 0;
`;

const BoardItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 10px 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
`;

const BoardItemTitle = styled.div`
    cursor: pointer;
    color: #007bff;
    font-weight: bold;
`;