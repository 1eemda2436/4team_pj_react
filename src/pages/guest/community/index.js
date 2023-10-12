import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const community = () => {
    const router = useRouter();
    return(
        <MainComponent>
            <h1>자유게시판</h1>
            <div>카테고리</div>
            
            <div onClick={() => router.push('community/BoardWrite')}>글쓰기</div>

            <div>
                <div>
                    <div>작성자</div>
                    <div>조회수</div>
                </div>
                <div>사진</div>
                <div>
                    <div onClick={() => router.push('community/BoardDetails')} >제목</div>
                    <div>글내용</div>
                </div>
            </div>

            <div>
                뉴스 api
            </div>
        </MainComponent>
    )
}

export default community;

community.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;