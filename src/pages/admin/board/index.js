import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';

const Notice = () => {
    const router = useRouter();
    return(
        <div>
            <div>
                <h2>공지사항</h2>
                <div>
                    <div>NO.</div>
                    <div onClick={() => router.push('/guest/notice/NoticeDetails')}>최근 공지사항을 보여줍니다.</div>
                    <div>일자 2023-10-06</div>
                    <div>체크박스</div>
                </div>
            </div>
            <div>삭제</div>
            
            <div>
                <h2>자유게시판</h2>
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
            </div>
            <div>삭제</div>
        </div>
    )
}

export default Notice;

Notice.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};