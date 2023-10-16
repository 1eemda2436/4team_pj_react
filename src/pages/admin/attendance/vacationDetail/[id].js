import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
    textAlign: "center",
    fontWeight: "bold",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

// 연차 승인/반려[관리자] 상세페이지

function AdminVacationConfirm() {
    const router = useRouter();
    const vacation_id = router.query.id;

    const [vacation, setVacation] = useState([]);

    useEffect(() => {
        if (vacation_id) {
        console.log(vacation_id)
        axios
            .get(`http://localhost:8081/attendance/vacationDetail/${vacation_id}`)
            .then((response) => {
                setVacation(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [vacation_id]);

    const handleConfirm = () => {
        axios
            .put(`http://localhost:8081/attendance/vacationConfirm/${vacation_id}`)
            .then((response) => {
                setVacation(response.data);
                // 승인 요청 처리 후 adminAnnualList 페이지로 이동
                console.log("승인!!!");
                router.push('/admin/attendance/adminVacationList');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const handleReturn = () => {
        axios
            .put(`http://localhost:8081/attendance/vacationReturn/${vacation_id}`)
            .then((response) => {
                setVacation(response.data);
                // 반려 요청 처리 후 adminAnnualList 페이지로 이동
                console.log("반려!!!");
                router.push('/admin/attendance/adminVacationList');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const startDate = new Date(vacation.vacation_start); // 데이터베이스로부터 가져온 문자열을 Date 객체로 파싱
    const endDate = new Date(vacation.vacation_end);
    const writeDate = new Date(vacation .vacation_reg_date);
    
    const formattedStartDate = startDate.toLocaleDateString(); // 날짜를 원하는 형식으로 형식화
    const formattedEndDate = endDate.toLocaleDateString();
    const formattedWriteDate = writeDate.toLocaleString();
    
    const formattedDate = `${formattedStartDate} - ${formattedEndDate}`;
    const formattedWirte = `${formattedWriteDate}`;
    
    
    return (
        <div align="center">
            <div>
                <button>PDF 다운</button>
                <button>결제 취소</button>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <th style={cellStyle}>문서 번호</th>
                            <td style={cellStyle}>{vacation.vacation_id}</td>
                            <th style={cellStyle}>작성일자</th>
                            <td style={cellStyle}>{formattedWirte}</td>
                        </tr>

                        <tr>
                            <th style={cellStyle}>제목</th>
                            <td style={cellStyle} colSpan={3}>{vacation.vacation_title}</td>
                        </tr>

                        <tr>
                            <th style={cellStyle}>날짜</th>
                            <td style={cellStyle} colSpan={3}>{formattedDate}</td>
                        </tr>

                        <tr>
                            <td colSpan={4} style={cellStyle}>
                                {vacation.vacation_content}
                            </td>
                        </tr>

                        <tr>
                            <th style={cellStyle}>구분</th>
                            <td style={cellStyle} colSpan={3}>---</td>
                        </tr>

                        <tr>
                            <th style={cellStyle}>첨부파일</th>
                            <td style={cellStyle}  colSpan={3}>
                                <input type="file"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <h1>결재의견</h1>
                <input type="text" placeholder="반려시 필수 작성"/>
                <br/><br/>
                <button style={{ cursor: 'pointer' }} onClick={handleConfirm} >승인</button>
                <button style={{ cursor: 'pointer' }} onClick={handleReturn} >반려</button>
            </div>
        </div>
    );
}

export default AdminVacationConfirm;

AdminVacationConfirm.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
