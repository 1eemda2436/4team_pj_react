import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const notice = () => {
    const router = useRouter();
    return(
        <MainComponent>
            <h1>공지사항</h1>
            <div onClick={() => router.push('/admin/board/NoticeWrite')}>글쓰기(관리자 로그인시 관리자만 보이게)</div>
            
            <div>
                <div>NO.</div>
                <div onClick={() => router.push('/guest/notice/NoticeDetails')}>최근 공지사항을 보여줍니다.</div>
                <div>일자 2023-10-06</div>
            </div>
        </MainComponent>
    )
}

export default notice;

notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;