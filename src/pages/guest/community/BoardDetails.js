import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const BoardDetails = () => {
    const router = useRouter();
    return(
        <div>
            <h1>자유게시판 상세</h1>
            <div onClick={() => router.back()}>이전 아이콘</div>
            <div>
                <div>제목</div>
                <div>글내용</div>
                <div>
                    <div>프로필</div>
                    <div>작성자</div>
                    <div onClick={() => router.push('/guest/community/BoardUpdate')}>수정</div>
                    <div onClick={() => router.push('/guest/community')}>삭제</div>
                </div>
                <div>제목</div>
            </div>
            <div>
                <div type="text">댓글입력란 [여기 input 으로]</div>
                <div type="submit">입력 [여기 input 으로]</div>
            </div>
            <div>
                <table>
                    <tr>
                        <td>작성자</td>
                        <td>글내용</td>
                        <td>일자</td>
                        <td>좋아요</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default BoardDetails;

BoardDetails.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%; 
    display: flex;
    align-items: center;
    flex-direction: column;
`;