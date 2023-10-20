import AdminLayout from "@/components/layout/adminLayout";
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

function AdminAnnualConfirm() {
    const router = useRouter();
    const annual_id = router.query.id;

    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        if (annual_id) {
            axios
                .get(`http://localhost:8081/all/attendance/annualDetail/${annual_id}`)
                .then((response) => {
                    setAttendance(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [annual_id]);

    const handleConfirm = () => {
        axios
            .put(`http://localhost:8081/admin/attendance/annualConfirm/${annual_id}`)
            .then((response) => {
                setAttendance(response.data);
                console.log("승인!!!");
                router.push('/admin/attendance/adminAnnualList');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const handleReturn = () => {
        axios
            .put(`http://localhost:8081/admin/attendance/annualReturn/${annual_id}`)
            .then((response) => {
                setAttendance(response.data);
                console.log("반려!!!");
                router.push('/admin/attendance/adminAnnualList');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const handlePdfDownload = () => {
        window.print(); // 브라우저 인쇄 다이얼로그를 열기
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
                    onClick={() => router.push('/admin/attendance/adminAnnualList')}
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
                            <th style={TableHead2}>결재의견</th>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>제목</th>
                            <td style={cellStyle} colSpan={3}>{attendance.annual_title}</td>
                            <td style={cellStyle} rowSpan={4}>
                                <input type="text" placeholder="반려시 필수 작성" style={{}} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>날짜</th>
                            <td style={cellStyle} colSpan={3}>{formattedDate}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead3} colSpan={4}>내용글씨바꿔줘</th>
                        </tr>

                        <tr style={rowStyle}>
                            <td colSpan={4} style={cellStyle}>
                                {attendance.annual_content}
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>구분</th>
                            <td style={cellStyle} colSpan={3}>---</td>
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
                                    onClick={handleConfirm}
                                >
                                    승인
                                </button>
                                <button
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "20px",
                                        fontSize: "1rem",
                                        margin: "10px",
                                    }}
                                    onClick={handleReturn}
                                >
                                    반려
                            </button>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            
        </div>
    );
}

export default AdminAnnualConfirm;

AdminAnnualConfirm.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
