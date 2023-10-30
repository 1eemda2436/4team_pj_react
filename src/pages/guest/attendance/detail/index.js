import Header from "@/components/common/header";
import MainLayout from "@/components/layout/mainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 내 근태 현황(상세)

function formatDateFromTimestamp(timestamp) {   // 날짜
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatTimeFromTimestamp(timestamp) {   // 시간
    if (!timestamp) return '';

    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
};
function AttendanceDetail () {
    const [attendance, setAttendance] = useState([]);
    const [annual, setAnnual] = useState([]);
    const [vacat, setVacat] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        axios
            .get(`http://localhost:8081/guest/attendance/myWorkDetail/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setAttendance(response.data);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');

        axios
            .get(`http://localhost:8081/guest/attendance/myCurrentAnnual/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setAnnual(response.data);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');

        axios
            .get(`http://localhost:8081/guest/attendance/myVacationPre/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setVacat(response.data);
            });
    }, []);

    return (
        <>
            <Header />
            <MainContainer align="center">
                <Title>나의 근태 현황</Title>
                
                <TopContainer>
                    <TblComponent>
                        <Table>
                            <thead>
                                <tr>
                                <th>휴가계</th>
                                <th>휴가 시작 일자</th> 
                                <th>휴가 종료 일자</th>
                                <th>휴가 기간</th>
                                <th>휴가 사유</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{vacat.vacation_title}</td>
                                <td>{formatDateFromTimestamp(vacat.vacation_start)}</td>
                                <td>{formatDateFromTimestamp(vacat.vacation_end)}</td>
                                <td>{vacat.vacationTerm}</td>
                                <td>{vacat.vacation_content}</td>
                                </tr>
                            </tbody>
                        </Table>

                        <AttenTable>
                            <tbody>
                            <tr>
                                <th style={{width: "150px"}}>사원번호</th>
                                <td>{attendance.id}</td>
                            </tr>  

                            <tr>
                                <th>부서번호</th>
                                <td>{attendance.depart_id}</td>
                            </tr>

                            <tr>
                                <th>부서 명</th>
                                <td>{attendance.depart_name}</td>
                            </tr>

                            <tr>
                                <th>성명</th>
                                <td>{attendance.name}</td>
                            </tr>

                            <tr>
                                <th>금일 출근시간</th>
                                <td>{formatTimeFromTimestamp(attendance.general_workin)}</td>
                            </tr>

                            <tr>
                                <th>금일 퇴근시간</th>
                                <td>{formatTimeFromTimestamp(attendance.general_workout)}</td>
                            </tr>

                            <tr>
                                <th>금일 추가근무시간</th>
                                <td>{attendance.todaymyOT}</td>
                            </tr>

                            <tr>
                                <th>총 근무시간</th>
                                <td>{attendance.totalmyWork}</td>
                            </tr>
                                
                            </tbody>
                        </AttenTable>
                    </TblComponent>

                    <CenteredGrid>
                        <AnnualRequest onClick={() => router.push('/guest/attendance/register/annualRegister')} style={{ cursor: 'pointer' }}>
                            [ 연차 신청 ]
                        </AnnualRequest>

                        <AnnualRequest onClick={() => router.push('/guest/attendance/register/vacationRegister')} style={{ cursor: 'pointer' }}>
                            [ 휴가 신청 ]
                        </AnnualRequest>

                        <AnnualRest>
                            [ 총 연차 합계 ]
                        </AnnualRest>

                        <AnnualRest>
                            [ {annual.total_annual} ]
                        </AnnualRest>

                        <AnnualRest onClick={() => router.push('/guest/attendance/annuallist/')} style={{ cursor: 'pointer' }}>
                            [ 사용한 연차]
                        </AnnualRest>

                        <AnnualRest onClick={() => router.push('/guest/attendance/annuallist/')} style={{ cursor: 'pointer' }}>
                            [ {annual.used_annual} ]
                        </AnnualRest>

                        <AnnualRest>
                            [ 미사용 연차 ]
                        </AnnualRest>

                        <AnnualRest>
                            [ {annual.annuallastcount} ]
                        </AnnualRest>
                    </CenteredGrid>
                </TopContainer>
            </MainContainer>
        </>
    );
}

export default AttendanceDetail;

AttendanceDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainContainer = styled.div`
    width: 100%;
    height: 90%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    padding: 40px;
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 70px;
`;

const TopContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TblComponent = styled.div`
    max-width: 800px;
`;

const Table = styled.table`
    width:100%;
    table-layout: fixed;
    font-size: .9em;
    width: 800px;
    min-width: 650px;
    border-collapse: collapse;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,.10);
    box-sizing: border-box;
    width: 100%;

    th {
    padding: 20px 15px;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    white-space: nowrap;
    }

    td {
    padding: 15px;
    vertical-align: middle;
    font-size: 13px;
    border-bottom: solid 1px #E5E5E5;
    text-align: center;
    word-wrap: break-word;
    }
`;

const AttenTable = styled(Table)`
    margin-top: 40px;
`;

const AnnualRest = styled.div`
    border-radius: 20px;
    background-color: #eff1f6;;
    height: 100px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

const AnnualRequest = styled.div`
    border-radius: 20px;
    background-color: #007bff;
    height: 100px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
`;

const CenteredGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 350px);
    grid-gap: 25px;
    justify-content: center;
    align-items: center;
    margin-left: 120px;
`;