import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';

const NoticeWrite = () => {
    const router = useRouter();
    return(
        <div>
            <h1>공지사항 등록</h1>

            <div>
                <div>제목</div>
                <div>내용</div>

                <div>
                    <div>관리자 (체크박스 진행)</div>
                    <div>부서장 (체크박스 진행)</div>
                    <div>팀장 (체크박스 진행)</div>
                    <div>전 사원 (체크박스 진행)</div>
                </div>
            </div>

            <button onClick={() => router.push('/guest/notice')}>등록</button>
        </div>
    );
}

export default NoticeWrite;

NoticeWrite.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

// onClick={() => router.push('/guest')}