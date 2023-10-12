import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const NoticeDetails = () => {
    const router = useRouter();
    return(
        <div>
              <h1>공지사항 상세</h1>

              <div>
                <div>제목</div>
                <div>프로필</div>
                <div>작성자</div>
                <div>글내용</div>
              </div>

              <div onClick={() => router.back()}>삭제 (관리자만 보이게)</div>
              <div onClick={() => router.back()}>이전</div>
        </div>
    )
}

export default NoticeDetails;

NoticeDetails.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;