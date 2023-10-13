import styled from "styled-components";
import HeaderNotice from '../../../public/asset/icons/HeaderNotice.svg'
import User from '../../../public/asset/icons/user.svg'
import { useRouter } from "next/router";

const Header = ({isNoticeShow = true, isUserShow = true}) => {
    const router = useRouter();

    return(
        <MainCompoenet>
            {isNoticeShow && (
                <NotcieBox>
                    <HeaderNotice />
                    <NoticeContent>
                        최근 등록된 공지입니다.
                    </NoticeContent>
                </NotcieBox>
            )}
            
            {isUserShow && (
                <UserBox onClick={() => router.push('/guest/my')}>
                    <User width="45" height="45" />
                    <UserStatus />
                    <UserContent>
                        <UserName>사원명</UserName>
                        <UserTeam>소속부서 - 소속팀</UserTeam>
                    </UserContent>
                </UserBox>
            )}
        </MainCompoenet>
    )
}

export default Header;

const MainCompoenet = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    box-sizing: border-box;
`;

const NotcieBox = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const NoticeContent = styled.div`
    font-size: 24px;
    margin-left: 10px;
    font-weight: 700;
`;

const UserBox = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

const UserStatus = styled.div`
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background: #24FF00;
    position: absolute;
    top: 0;
    left: -5px;
`;

const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const UserName = styled.div`
    font-size: 20px;
    margin-bottom: 3px;
    font-weight: 700;
`;

const UserTeam = styled.div`
    font-weight: 300;
`;
