import Search from '../../../public/asset/icons/search.svg';
import styled from "styled-components";
import User from "../../../public/asset/icons/user.svg"
import ArrowRight from "../../../public/asset/icons/arrowRight.svg"
const ChattingMain = () => {
    return (
        <Component>
            <Chatdiv> 
                {/* 채팅목록*/}
                <div>
                    <div>채팅목록</div>
                    <div>사원검색 <Search/></div>
                </div>
                <div>
                    <div>
                   <div>QnA</div>
                   <div>관리자에게 질문하기</div>
                    </div>
                    <ArrowRight/>
                </div>
                <div>
                    <div><User/></div>
                    <div>보낸사람</div>
                    <div>보낸메세지</div>
                    <div>보낸시간</div>
                    <div>안읽은건수</div>
                </div>


            </Chatdiv>
        </Component>
    );
}

const Component = styled.div``;

const Chatdiv = styled.div `
    border: 1px solid black;

`;

export default ChattingMain;