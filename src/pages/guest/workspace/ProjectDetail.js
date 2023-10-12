import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const ProjectDetail = () => {
    const router = useRouter();
    return (
        <Component>
            <div>
                {/* 프로젝트명 */}
                <div>
                    <div>프로젝트명</div>
                    <div>프로젝트명</div>
                </div>
                {/* 기한 */}
                <div>
                    <div>기한</div>
                    <div>기한</div>
                </div>
                {/* 프로젝트명 */}
                <div>
                    <div>팀원</div>
                    <div>팀원</div>
                </div>
                <div>내용</div>
            </div>
            <div>
                <button onClick={() => router.push('/guest/workspace')}>수정</button>
                <button onClick={() => router.push('/guest/workspace')}>삭제</button>
                <button onClick={() => router.push('/guest/workspace')}>목록</button>
            </div>
                        
        </Component>

    )

}

const Component = styled.div``;


export default ProjectDetail;

ProjectDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};