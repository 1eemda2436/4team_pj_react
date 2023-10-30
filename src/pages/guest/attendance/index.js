import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import User from '../../../../public/asset/icons/user.svg'
import Header from "@/components/common/header";
import { useRouter } from "next/router";
import MyCalendar from "@/components/calendar/MyCalendar";
import { useEffect, useState } from "react";
import axios from "axios";


const WeeklyWorkButton = styled.a`
    cursor: pointer;
    background-color: #005FC5;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
    background-color: #003F85;
    }
`;

const SectionHeader = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: #005FC5;
    margin-top: 20px;
`;

const SectionText = styled.div`
    font-size: 18px;
    color: #333;
    margin-top: 10px;
`;

const SectionValue = styled.div`
    font-size: 20px;
    color: #005FC5;
    font-weight: bold;
    margin-top: 5px;
`;

const SectionContainer = styled.div`
    background-color: #F6F8FA;
    padding: 20px;
    border-radius: 5px;
    margin-top: 20px;
    text-align: center;
`;


// main
function Attendance () {
    const [attendance, setAttendance] = useState([]);
    const [weeklyWork, setWeeklyWork] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        axios
            .get(`http://localhost:8081/guest/attendance/myAttenCount/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("값? : ", response.data);
                setAttendance(response.data);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        axios
            .get(`http://localhost:8081/guest/attendance/weeklyWorkTime/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("값? : ", response.data);
                setWeeklyWork(response.data);
            });
    }, []);

    return (
        <MainComponent>
            <Header />
            <AttenComponent>
                <AttenBoxTop>
                    <AttenBoxUser>
                        <UserIconBox>
                            <UserIcon width='70' height='70' />
                            <span>{attendance.name}</span>
                        </UserIconBox>
                        <UserContent>
                            {attendance.id}
                        </UserContent>
                    </AttenBoxUser>
                    
                    <AttenBoxInfo>
                        <div className="circle-container">
                            <CircleBox>
                                <div className="circle">{attendance.total_annual}</div>
                                총 연차
                            </CircleBox>

                            <CircleBox>
                                <div className="circle">{attendance.used_annual}</div>
                                사용 연차
                            </CircleBox>
                            
                            <CircleBox>
                                <div className="circle">{attendance.annuallastcount}</div>
                                잔여 연차
                            </CircleBox>
                            
                            <CircleBox>
                                <div className="circle">{attendance.worklate}</div>
                                지각계
                            </CircleBox>

                            <CircleBox>
                                <div className="circle">{attendance.noworking}</div>
                                결근계
                            </CircleBox>

                            <CircleBox>
                                <div className="circle">{attendance.earlyout}</div>
                                조퇴계
                            </CircleBox>
                        </div>
                    </AttenBoxInfo>
                </AttenBoxTop>
                
                <AttenBoxBottom>
                    <AttenCal>
                        <MyCalendar height={550} />
                    </AttenCal>
                    
                    <AttenWeekWork>
                        <div className="work-hours">
                            {localStorage.getItem('auth') !== 'ROLE_ADMIN' && (
                                <WeeklyWorkButton onClick={() => router.push('/guest/attendance/detail/')}>
                                    쭈강 긍무 형황
                                </WeeklyWorkButton>
                            )}
                        </div>
                        <br/>
                        <SectionContainer>
                            <SectionHeader>총 근무 시간</SectionHeader>
                            <SectionText>이번 주 동안 근무한 시간</SectionText>
                            <SectionValue>{weeklyWork.totalWeekWork}</SectionValue>
                        </SectionContainer>
                        <SectionContainer>
                            <SectionHeader>총 연장 근무 시간</SectionHeader>
                            <SectionText>이번 주 동안 연장 근무한 시간</SectionText>
                            <SectionValue>{weeklyWork.totalWeekOver}</SectionValue>
                        </SectionContainer>
                        <SectionContainer>
                            <SectionHeader>남은 최소 근무 시간</SectionHeader>
                            <SectionText>남은 최소 근무 시간</SectionText>
                            <SectionValue>{weeklyWork.remainWeekTime}</SectionValue>
                        </SectionContainer>

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
