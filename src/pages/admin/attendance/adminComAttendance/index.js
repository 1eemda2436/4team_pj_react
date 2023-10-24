import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import AttenCalendar from "@/components/calendar/AttenCalendar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// 관리자 부서별 근태 통계(상세)
const AdminAttenAnnualDetail = () => {
    // 테두리 스타일을 정의합니다.

    const [attendance, setAttendance] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        axios
            .get(`http://localhost:8081/admin/attendance/companyStatus/${selectedCompany}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("값? : ", response.data);
                const attendanceData = response.data;
                setAttendance(attendanceData);
            });
    }, [selectedCompany]);
    
    return (
        <div align="center">
            <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                <option value="">전사 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <div>
            {loading ? (
                <p>Loading...</p> // 데이터 로딩 중인 동안 로딩 메시지를 표시
            ) : (
            <TblComponent>
                <PayTableBottom style={{ height: "auto", maxHeight: "400px" }}>
                    <tbody>
                        <tr>
                            <th>부서번호</th>
                            <th>부서명</th>
                            <th>사원번호</th>
                            <th>사원명</th>
                            <th>지각계</th>
                        </tr>
                        {attendance.map((atten => (
                            <React.Fragment key={atten.company_id}>
                                <tr>
                                    <td>{atten.name}</td>
                                    <td>{atten.depart_id}</td>
                                    <td>{atten.depart_name}</td>
                                    <td>{atten.lateCount}</td>
                                    <td>{atten.holidayCount}</td>
                                </tr>
                            </React.Fragment>
                        )))}
                        </tbody>
                </PayTableBottom>
            </TblComponent>
            )}
            </div>
            <br/><br/><hr/><br/><br/>
            <div style={{ border: "3px solid black", borderRadius: "20px", width: "600px", height: "665px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AttenCalendar />
            </div>
        </div>


    );
}

export default AdminAttenAnnualDetail;

AdminAttenAnnualDetail.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};


const TblComponent = styled.div`
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,.10);
    box-sizing: border-box;
    margin-top: 40px;
    width: 800px;
`;

const TblHeader = styled.div`
    padding: 0px 15px;
    background: #F6F8FA;
    border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
    height: 550px;
    overflow-x: auto;
    padding: 0px 15px;

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

const MainComponent = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Table = styled.table`
    width: 100%;
    font-size: 0.9em;
    border-collapse: collapse;

    th {
        padding: 15px;
        text-align: center;
        font-weight: 500;
        font-size: 15px;
        text-transform: uppercase;
    }

    td {
        padding: 15px;
        text-align: center;
        word-wrap: break-word;
    }
`;

const PayTableTop = styled(Table)``;

const PayTableBottom = styled(Table)`
    margin-top: 20px;
`;
