
import styled from "styled-components";
const ProjectDetail = () => {
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
                <button>등록</button>
                <button>수정</button>
                <button>삭제</button>
            </div>
                        
        </Component>

    )

}

const Component = styled.div``;

export default ProjectDetail;