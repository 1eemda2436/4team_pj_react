import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const cellStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "900px",
    margin: "0 auto",
};

const rowStyle = {
    borderBottom: "1px solid #ddd",
};

const buttonStyle = {
    cursor: 'pointer',
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    fontSize: "1rem",
    margin: "10px",
};

const TableHead = {
    backgroundColor: "#007BFF",
    color: "white",
};

const TableHead2 = {
    backgroundColor: "#007BFF",
    color: "white",
    width: "100px",
};

const TableHead3 = {
    backgroundColor: "#007BFF",
    color: "white",
    width: "100px",
    height: "41px",
};

// 연차 상세페이지

function GuestVacationConfirm() {
    const router = useRouter();
    const vacation_id = router.query.id;
    
    const [vacation, setVacation] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (vacation_id) {
            axios
                .get(`http://localhost:8081/all/attendance/vacationDetail/${vacation_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setVacation(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [vacation_id]);

    const handlePdfDownload = () => {
        window.print(); // 브라우저 인쇄 
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
                <button style={buttonStyle}>PDF 다운</button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: "#6c757d",
                    }}
                    onClick={() => router.push('/admin/attendance/adminAnnualList')}
                    >
                    돌아가기
                </button>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr style={rowStyle}>
                            <th style={TableHead}>문서 번호</th>
                            <td style={cellStyle}>{vacation.vacation_id}</td>
                            <th style={TableHead}>작성일자</th>
                            <td style={cellStyle}>{formattedWirte}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>제목</th>
                            <td style={cellStyle} colSpan={3}>{vacation.vacation_title}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>날짜</th>
                            <td style={cellStyle} colSpan={3}>{formattedDate}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <td colSpan={4} style={cellStyle}>
                                {vacation.vacation_content}
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>구분</th>
                            <td style={cellStyle} colSpan={3}>---</td>
                        </tr>

                    </tbody>
                </table>
                    <button
                        style={{
                            cursor: 'pointer',
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "20px",
                            fontSize: "1rem",
                            margin: "10px",
                        }}
                        onClick={() => router.push(`/guest/attendance/vacationModify/${vacation.vacation_id}`)}
                    >
                        수정
                    </button>
                    <button
                        style={{
                            cursor: 'pointer',
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "20px",
                            fontSize: "1rem",
                            margin: "10px",
                        }}
                        onClick={() => router.push('/guest/attendance/vacationlist')}
                    >
                        취소
                    </button>
                </div>
            <br/><br/><hr/><br/><br/>
        </div>
    );
}

export default GuestVacationConfirm;

GuestVacationConfirm.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
