import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/api/apiPath";

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

// 연차 승인/반려[관리자] 상세페이지

function AdminVacationConfirm() {
    const router = useRouter();
    const vacation_id = router.query.id;
    
    const [vacation, setVacation] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (vacation_id) {
        console.log(vacation_id)
        axios
            .get(`${BASE_URL}/all/attendance/vacationDetail/${vacation_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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
        const token = localStorage.getItem('token');
        axios
            .put(`${BASE_URL}/admin/attendance/vacationConfirm/${vacation_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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
        const token = localStorage.getItem('token');
        axios
            .put(`${BASE_URL}/admin/attendance/vacationReturn/${vacation_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
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

    const handlePdfDownload = () => {
        window.print(); // 브라우저 인쇄 다이얼로그를 열기
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
                <button style={buttonStyle} onClick={handlePdfDownload}>PDF 다운</button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: "#6c757d",
                    }}
                    onClick={() => router.push('/admin/attendance/adminVacationList')}
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
                            <th style={TableHead2}>결재의견</th>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>사원번호</th>
                            <td style={cellStyle}>{vacation.id}</td>
                            <th style={TableHead}>작성자명</th>
                            <td style={cellStyle}>{vacation.name}</td>
                            <td style={cellStyle} rowSpan={5}>
                                <input type="text" placeholder="반려시 필수 작성" style={{}} />
                            </td>
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
                            <th style={TableHead3} colSpan={4}>내용글씨바꿔줘</th>
                        </tr>

                        <tr style={rowStyle}>
                            <td colSpan={4} style={cellStyle}>
                                {vacation.vacation_content}
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

export default AdminVacationConfirm;

AdminVacationConfirm.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
