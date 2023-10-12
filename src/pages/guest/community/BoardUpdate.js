import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const BoardUpdate = () => {
    const router = useRouter();
    return(
        <div>
            <h1>자유게시판 등록</h1>

            <div>
                <div>
                    <div>
                        <div>제목</div>
                        <div>글내용</div>
                        <div>작성일</div>
                    </div>
                    <div>사진, 추가 드래그</div>
                </div>
            </div>
            <button onClick={() => router.push('/guest/community/BoardDetails')}>수정</button>
            <button onClick={() => router.back()}>이전</button>
        </div>
    )
}

export default BoardUpdate;

BoardUpdate.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%; 
    display: flex;
    align-items: center;
    flex-direction: column;
`;