import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import User from "../../../../public/asset/icons/user.svg"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";

const Chatting = () => {
    const [showMessage, setShowMessage] = useState(true);

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
                            <User/>

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
                        <User/>
                        <UserName>사원명</UserName>
                    </UserHeader>

                    <MessageComponent>

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
    width: 100%;
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

const MessageComponent = styled.div``;