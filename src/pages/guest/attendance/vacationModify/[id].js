import MainLayout from "@/components/layout/mainLayout";
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

const cellStyle2 = {
    border: "1px solid #ddd",
    padding: "12px",
    textAlign: "center",
    fontWeight: "bold",
    height: "300px"
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "900px", // 테이블 너비 조정
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

function GuestVacationModify() {
    const router = useRouter();
    const vacation_id = router.query.id;
    
    const [vaca, setVaca] = useState({
        vacation_title: '',
        vacation_start: '',
        vacation_end: '',
        vacation_content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVaca((prevVaca) => ({
            ...prevVaca,
            [name]: value,
        }));
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (vacation_id) {
            axios
                .get(`${BASE_URL}/all/attendance/vacationDetail/${vacation_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setVaca(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [vacation_id]);

    const handleConfirm = () => {
        const token = localStorage.getItem('token')

        axios
            .put(`${BASE_URL}/guest/attendance/vacationDetail/${vacation_id}`, vaca, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("신청 완료:", response.data);
                router.push('/guest/attendance/vacationlist');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const handlePdfDownload = () => {
        window.print(); // 브라우저 인쇄 
    };
    
    const startDate = new Date(vaca.vacation_start);
    const endDate = new Date(vaca.vacation_end);
    const writeDate = new Date(vaca.vacation_reg_date);

    const formattedStartDate = startDate.toLocaleDateString();
    const formattedEndDate = endDate.toLocaleDateString();
    const formattedWriteDate = writeDate.toLocaleString();

    const formattedDate = `${formattedStartDate} - ${formattedEndDate}`;
    const formattedWrite = `${formattedWriteDate}`;

    return (
        <div align="center">
            <div>
                <button style={buttonStyle} onClick={handlePdfDownload}>PDF 다운</button>
                <button
                    style={{
                        ...buttonStyle,
                        backgroundColor: "#6c757d",
                    }}
                    onClick={() => router.push('/guest/attendance/vacationlist')}
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
                            <td style={cellStyle}>{vaca.vacation_id}</td>
                            <th style={TableHead}>작성일자</th>
                            <td style={cellStyle}>{formattedWrite}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>제목</th>
                            <td style={cellStyle} colSpan="3">
                                <input type="text" name="vacation_title" placeholder="제목입력~" size="30" value={vaca.vacation_title} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <td style={cellStyle}>
                                <label htmlFor="vacation_start">시작일</label>
                                <input type="date" name="vacation_start" value={vaca.vacation_start} onChange={handleInputChange} />
                            </td>
                            <td style={cellStyle}>
                                <label htmlFor="vacation_end">종료일</label>
                                <input type="date" name="vacation_end" value={vaca.vacation_end} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead} colSpan="4">내용</th>
                        </tr>

                        <tr style={rowStyle}>
                            <td style={cellStyle2} colSpan="4">
                                <input type="text" name="vacation_content" placeholder="내용 입력~" style={{ width: "100%" , height: "100%"}} value={vaca.vacation_content} onChange={handleInputChange} />
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
                    onClick={handleConfirm}
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
            <hr />
        </div>
    );
}

export default GuestVacationModify;

GuestVacationModify.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
