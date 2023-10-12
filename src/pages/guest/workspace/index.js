import MainLayout from "@/components/layout/mainLayout"

const Workspace = () => {
    return (
        <Component>
            {/* 부서별 사원 */}
            <div>
                <div>부서ID</div>
                <div>부서명</div>
                <div>사원이름</div>
            </div>

            {/* 프로젝트 현황(목록) */}
            <div>
                <div>PJ_ID</div>
                <div>부서ID</div>
                <div>프로젝트명</div>
                <div>내용</div>
                <div>기한(시작일)</div>
                <div>기한(종료일)</div>
            </div>
            
            {/* 할일list */}
            <div>
                <div>PW_ID</div>
                <div>PJ_ID</div>
                <div>담당업무</div>
                <div>제목</div>
                <div>기한(시작일)</div>
                <div>기한(종료일)</div>
                <div>완료여부</div>
            </div>
        </Component>
    )

}

export default Workspace;

Workspace.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const Component = styled.div``;