import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import User from "../../../../public/asset/icons/user.svg"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import { useRouter } from 'next/router'


const Chatting = () => {
    const token = localStorage.getItem('token')
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    const handleUserBoxClick = () => {
        setShowMessage(!showMessage);
    };

    return (
        <MainCompoenet>
            <ChattingMainComponent>
                <ChattingComponent> 
                    <ChatHeader>
                        <Title>채팅목록</Title>
                        <SearchBox>
                            <SearchInput type="text" placeholder="사원 검색" /> 
                            <SearchIconStyle />
                        </SearchBox>
                    </ChatHeader>
                    <ChatHeaderBottom>
                        <BotttomTitleBox>
                            <QnASpan>QnA</QnASpan>
                            <BottomTitle>관리자에게 질문하기</BottomTitle>
                        </BotttomTitleBox>

                        <KeyboardArrowRightIconStyle />
                    </ChatHeaderBottom>

                    <ChattingContent>
                        <UserBox onClick={handleUserBoxClick}>
                            <User width="42" height="42" />

                            <UserDiv>
                                <Users>
                                    <Name>사원명</Name>
                                    <Time>13:50</Time>
                                </Users>
                                <Users>
                                    <SendM>보낸메세지</SendM>
                                    <AlertBox>12</AlertBox>
                                </Users>
                            </UserDiv>
                        </UserBox>
                    </ChattingContent>
                </ChattingComponent>
            </ChattingMainComponent>

            {showMessage && 
                <MessageMainComponent>
                    <UserHeader>
                    <User width="42" height="42" />
                        <UserName>사원명</UserName>
                    </UserHeader>
                    <br/>

                    <MessageComponent>
                        <Message1>
                        <Message>
                            카톡카톡카톡
                        </Message>
                        <ReadTime>
                            20:20
                        </ReadTime>
                        <Read>
                            읽음
                        </Read>
                        </Message1>
                        <br/><br/>
                        
                        <Message1>
                        <Message>
                            카톡카톡카톡
                        </Message>
                        <ReadTime>
                            20:20
                        </ReadTime>
                        <Read>
                            읽음
                        </Read>
                        </Message1>
                        <br/><br/>
                        <Send1>
                        <SendTime>
                            20:20
                        </SendTime>
                        <SendMessage>
                            톡톡톡톡톡톡
                        </SendMessage>
                        </Send1>
                        <Text1>
                        <Text>
                            텍스트를 입력하세요
                        </Text>
                            <button>전송</button>
                        </Text1>


                        

                    </MessageComponent>
                </MessageMainComponent>
            }
        </MainCompoenet>
    );
}

export default Chatting;

Chatting.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainCompoenet = styled.div`
    height: 100%;
    padding: 50px 30px;
    box-sizing: border-box;
    display: flex;
`;

const ChattingMainComponent = styled.div`
    width: 430px;
    height: 100%;
    background: #333;
    border-radius: 40px;
    padding: 8px;
    box-sizing: border-box;
    border: 6px solid #000;
`;

const ChattingComponent = styled.div `
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    box-sizing: border-box;
    position: relative;
`;

const ChatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid #B3B3B3;;
`;

const Title = styled.div`
    font-weight: 600;
    cursor: default;
`;

const SearchBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #B3B3B3;
    border-radius: 5px;
    padding: 5px 10px;
`;

const SearchInput = styled.input`
    border: 0;
    outline: 0;
    padding: 5px;
    margin-right: 20px;
    width: 200px;
`;

const SearchIconStyle = styled(SearchIcon)`
    color: #B3B3B3;
    font-size: 18px;
    cursor: pointer;
`;

const ChatHeaderBottom = styled.div`
    border-radius: 3px;
    background: #FFF2C3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    margin-top: 12px;
    cursor: pointer;
`;

const BotttomTitleBox = styled.div`
    display: flex;
    align-items: center;
`;

const QnASpan = styled.span`
    color: #FF5C00;
    margin-right: 5px;
    font-size: 14px;
    font-weight: 600;
`;

const BottomTitle = styled.div`
    color: #F90;
`;

const KeyboardArrowRightIconStyle = styled(KeyboardArrowRightIcon)`
    color: #F90;
`;

const ChattingContent = styled.div`
    height: 530px;
    overflow-x: auto;
    padding: 0px 15px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    &::-webkit-scrollbar {
        width: 4px;
    } 

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    }
    
    &::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    }
`;

const UserBox = styled.div`
    display: flex;
    padding-bottom: 8px;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 15px;
    cursor: pointer;
`;

const UserDiv = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;

`;

const Users = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const Name = styled.div`
    font-size: 18px;
`;

const Time = styled.div`
    font-size: 12px;
    color: #B3B3B3;
`;

const SendM = styled.div`
    font-size: 15px;
`;

const AlertBox = styled.div`
    border-radius: 15px;
    background: #FF2727;
    padding: 4px 7px;
    font-size: 10px;
    color: #fff;
`;

const MessageMainComponent = styled.div`
    margin-left: 100px;
    display: flex;
    flex-direction: column;
`;

const UserHeader = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.div`
    font-size: 24px;
    margin-left: 10px;
`;


const MessageComponent = styled.div`
    
`;


const Message = styled.div`
    border-radius: 30px;
    background: #FFff03;
    padding: 4px 7px;
    height: 30px;
    width: 200px;
    font-size: 20px;
    color: black;
`;

const ReadTime = styled.div`
    font-size: 20px;
    margin-left: 10px;
`;

const Read = styled.div`
    font-size: 15px;
    margin-left: 10px;
`;

const Message1 = styled.div`
    display: flex;
`;

const SendMessage = styled.div`
    border-radius: 30px;
    background: #EAEAEA;
    padding: 4px 7px;
    height: 30px;
    width: 200px;
    font-size: 20px;
    color: black;
    float: right;
    
`;

const SendTime = styled.div`
    font-size: 20px;
    margin-left: 10px;
    
`;

const Text = styled.div`
    background: #EAEAEA;
    border-radius: 30px;
    padding: 4px 7px;
    height: 30px;
    font-size: 20px;
    margin-left: 10px;
    width: 100%; /* 부모 컴포넌트의 80% 너비를 차지하도록 설정 */
`;

const Text1 = styled.div`
    display: flex;
    position: fixed;
    bottom: 50px; /* 화면 하단에 고정 */
    width: 50%; /* 화면 가로 길이를 모두 차지하도록 설정 */
    justify-content: space-between; /* 자식 요소 사이의 공간을 최대화합니다 */
    align-items: center; /* 세로 중앙 정렬 */
`;

const Send1 = styled.div`
    right: 700px; /* 화면 오른쪽에 고정 */
    position: fixed;    
    display: flex;
`;

