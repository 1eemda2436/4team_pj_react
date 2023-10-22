import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import AttenCalendar from "@/components/calendar/AttenCalendar";
import { useEffect, useState } from "react";
import axios from "axios";

// 관리자 부서별 근태 현황(상세)
function AdminAttenDepDetail() {
    // 테두리 스타일을 정의합니다.
    const [attendance, setAttendance] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("131232131jfaj : ", token);
        if(selectedDepartment == null)
            setSelectedDepartment(1);

        axios
            .get(`http://localhost:8081/admin/attendance/departmentAtDetails/${selectedDepartment}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setAttendance(response.data);
            });
    }, [selectedDepartment]);

    return (
        <div align="center">
            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="">부서 선택</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <div>
            <TblComponent>
                <PayTableBottom>
                {attendance.map((atten) => (
                    <tbody key={atten.depart_id}>
                        <tr>
                            <th colSpan={2} style={{ cursor: 'pointer' }}>부서별 근태 현황</th>
                        </tr>

                        <tr>
                            <th colSpan={2}><hr/></th>
                        </tr>

                        <tr>
                            <th>금일 출근률</th>
                            <td>{atten.workinRate}</td>
                        </tr>

                        <tr>
                            <th>금일 지각률</th>
                            <td>{atten.timelate}</td>
                        </tr>

                        <tr>
                            <th>금일 연차률</th>
                            <td>{atten.annualRate}</td>
                        </tr>
                    </tbody>
                ))}
                </PayTableBottom>
            </TblComponent>
            </div>
            <br/><br/><hr/><br/><br/>
            <div style={{ border: "3px solid black", borderRadius: "20px", width: "400px", height: "465px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AttenCalendar />
            </div>
            <br/><br/><hr/><br/><br/>
            <TblComponent>
            {attendance.map((atten) => (
                <PayTableBottom key={atten.depart_id}>
                    <tr>
                        <th>지각자 수</th>
                        <th>연차 및 휴가 자</th>
                    </tr>

                    <tr>
                        <td>{atten.latedCount}</td>
                        <td>{atten.holidayCount}</td>
                    </tr>   
                </PayTableBottom>
            ))}
            </TblComponent>
        </div>
    );
}

export default AdminAttenDepDetail;

AdminAttenDepDetail.getLayout = function getLayout(page) {
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
    width:100%;
    table-layout: fixed;
    font-size: .9em;
    width: 800px;
    min-width: 650px;
    border-collapse: collapse;

    th {
    width: 150px;
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

const PayTableTop = styled(Table)``;

const PayTableBottom = styled(Table)`
    margin-top: 20px;
`;