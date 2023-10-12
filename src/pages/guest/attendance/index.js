import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import User from '../../../../public/asset/icons/user.svg'
import Header from "@/components/common/header";

// main
const Attendance = () => {
    return (
        <MainComponent>
            <Header />
            <AttenComponent>
                <AttenBoxTop>
                    <AttenBoxUser>
                        <UserIconBox>
                            <UserIcon width='70' height='70' />
                            <span>사원명</span>
                        </UserIconBox>
                        <UserContent>
                            부가설명
                        </UserContent>
                    </AttenBoxUser>
                    
                    <AttenBoxInfo>
                        <div className="circle-container">
                            <CircleBox>
                                <div className="circle">4</div>
                                총 연차
                            </CircleBox>

                            <CircleBox>
                                <div className="circle">1</div>
                                사용 연차
                            </CircleBox>
                            
                            <CircleBox>
                                <div className="circle">3</div>
                                잔여 연차
                            </CircleBox>
                            
                            <CircleBox>
                                <div className="circle">1</div>
                                지각계
                            </CircleBox>

                            <CircleBox>
                                <div className="circle">1</div>
                                결근계
                            </CircleBox>

                            <CircleBox>
                                <div className="circle">1</div>
                                조퇴계
                            </CircleBox>
                        </div>
                    </AttenBoxInfo>
                </AttenBoxTop>
                
                <AttenBoxBottom>
                    <AttenCal>
                        <div className="calendar">
                            [ 캘린더 자리 ]
                        </div>
                    </AttenCal>
                    
                    <AttenWeekWork>
                        <div className="work-hours">
                            [ 주간 근무 현황 ]
                        </div>
                        <div>[ 총 근무 시간 ]</div>
                        <div>[ 총 연장 근무 시간 ]</div>
                        <div>[ 남은 최소 근무 시간 ]</div>
                    </AttenWeekWork>
                </AttenBoxBottom>
            </AttenComponent>
        </MainComponent>
    );
}

export default Attendance;

Attendance.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%;
`;

const AttenComponent = styled.div`
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    padding: 50px 5%;
`;

const AttenBoxTop = styled.div`
    width: 100%;
    min-height: 20%;
    display: flex;
    margin-bottom: 20px;
`;

const AttenBoxBottom = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
`;

const AttenCal = styled.div`
    width: 40%;
    height: 100%;
    border: 2px solid #005FC5;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    margin-right: 10px;
`;

const AttenWeekWork = styled.div`
    width: 60%;
    height: 100%;
    margin-left: 10px;
    border: 2px solid #005FC5;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
`;

const AttenBoxUser = styled.div`
    border-radius: 10px;
    width: 20%;
    background-color: #F6F8FA;
    color: #005FC5;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    margin-right: 10px;
    border: 2px solid #005FC5;
    padding: 0px 10px;
`;

const UserIconBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserIcon = styled(User)`
    margin-bottom: 8px;
`;

const UserContent = styled.div`
    margin-left: 20px;
`;

const CircleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
`;

const AttenBoxInfo = styled.div`
    border: 2px solid #005FC5;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    font-size: 16px;
    margin-left: 10px;
    padding: 15px 0px;
    cursor: default;
    
    .circle-container {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 35px;
    }

    .circle {
        background-color: #F6F8FA;
        min-width: 80px;
        min-height: 80px;
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #005FC5;
        margin-bottom: 10px;
        font-size: 28px;
        font-weight: 700;

        &:hover {
            background-color: #005FC5;
            color: #fff;
        }
    }
`;
