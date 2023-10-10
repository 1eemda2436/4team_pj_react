
import styled from "styled-components";
const ProjectWorkDetail = () => {
    return (
        <Component>
            <div>
                {/* 프로젝트명 */}
                <div>
                    <div>프로젝트명</div>
                    <div>프로젝트명</div>
                </div>
                {/* 담당업무 */}
                <div>
                    <div>담당업무</div>
                    <div>담당업무</div>
                </div>
                {/* 기한 */}
                <div>
                    <div>기한</div>
                    <div>기한</div>
                </div>
                {/* 진행상황 */}
                <div>
                    <div>진행상황</div>
                    <div>진행상황</div>
                </div>
                <div>내용</div>
            </div>
            <div>
                <button>수정</button>
                <button>삭제</button>
            </div>
                        
        </Component>

    )

}

const Component = styled.div``;

export default ProjectWorkDetail;