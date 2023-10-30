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

function GuestAnnualConfirm() {
    const router = useRouter();
    const annual_id = router.query.id;
    
    const [attendance, setAttendance] = useState({});
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (annual_id) {
            axios
                .get(`http://localhost:8081/all/attendance/annualDetail/${annual_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setAttendance(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [annual_id]);

    const handlePdfDownload = () => {
        window.print(); // 브라우저 인쇄 
    };
    

    const startDate = new Date(attendance.annual_start);
    const endDate = new Date(attendance.annual_end);
    const writeDate = new Date(attendance.annual_reg_date);

    const formattedStartDate = startDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();
    const formattedWriteDate = writeDate.toLocaleString();

    const formattedDate = `${formattedStartDate} - ${formattedEndDate}`;
    const formattedWirte = `${formattedWriteDate}`;

    return (
        <div align="center">
            <div>
                <button style={buttonStyle} onClick={handlePdfDownload}>PDF 다운</button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: "#6c757d",
                    }}
                    onClick={() => router.push('/guest/attendance/annuallist')}
                    >
                    돌아가기
                </button>
            </div>
            <hr />
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr style={rowStyle}>
                            <th style={TableHead}>문서 번호</th>
                            <td style={cellStyle}>{attendance.annual_id}</td>
                            <th style={TableHead}>작성일자</th>
                            <td style={cellStyle}>{formattedWirte}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>제목</th>
                            <td style={cellStyle} colSpan={3}>{attendance.annual_title}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>날짜</th>
                            <td style={cellStyle} colSpan={3}>{formattedDate}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead3} colSpan={4}>내용</th>
                        </tr>

                        <tr style={rowStyle}>
                            <td colSpan={4} style={cellStyle}>
                                {attendance.annual_content}
                            </td>
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
                        onClick={() => router.push(`/guest/attendance/annualModify/${attendance.annual_id}`)}
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
                        onClick={() => router.push(`/guest/attendance/annuallist/${attendance.id}`)}
                    >
                        취소
                    </button>
                </div>
            <hr/>
        </div>
    );
}

export default GuestAnnualConfirm;

GuestAnnualConfirm.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
