import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";

// main
const Attendance = () => {
    return (
        <AttenContainer>
            <AttenBoxTop>
                <AttenBoxUser>
                    [ user ]
                </AttenBoxUser>
                
                <AttenBoxInfo>
                    <div className="circle-container">
                        <div className="circle">
                            <span>총 연차</span>
                        </div><br/>
                        총 연차
                        <div className="circle">
                            <span>사용 연차</span>
                        </div><br/>
                        사용 연차
                        <div className="circle">
                            <span>잔여 연차</span>
                        </div><br/>
                        잔여 연차
                        <div className="circle">
                            <span>지각계</span>
                        </div><br/>
                        지각계
                        <div className="circle">
                            <span>결근계</span>
                        </div><br/>
                        결근계
                        <div className="circle">
                            <span>조퇴계</span>
                        </div><br/>
                        조퇴계
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
        </AttenContainer>
    );
}

export default Attendance;

Attendance.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const AttenContainer = styled.div`
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
`;

const AttenBoxTop = styled.div`
    width: 80%;
    display: flex;
    margin-bottom: 50px;
`;

const AttenBoxBottom = styled.div`
    width: 80%;
    display: flex;
    margin-bottom: 50px;
`;

const AttenCal = styled.div`
    width: 50%;
    border: 3px solid black;
    border-radius: 20px;
    padding: 20px;
    height: 300px;
    text-align: center;
    margin-right: 10px;
`;

const AttenWeekWork = styled.div`
    width: 50%;
    margin-left: 10px;
    border: 3px solid black;
    border-radius: 20px;
    padding: 20px;
    height: 300px;
    text-align: center;
`;

const AttenBoxUser = styled.div`
    border: 3px solid black;
    border-radius: 20px;
    width: 20%;
    background-color: #17a1fa;
    height: 103px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-right: 10px;
`;

const AttenBoxInfo = styled.div`
    border: 3px solid black;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    font-size: 16px;
    height: 103px;
    font-size: 16px;
    margin-left: 10px;
    .circle-container {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
    }
    .circle {
        background-color: #17a1fa;
        width: 72px;
        height: 72px;
        border: 3px solid black;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    `;
