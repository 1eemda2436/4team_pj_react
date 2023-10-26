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

function GuestAnnualModify() {
    const router = useRouter();
    const annual_id = router.query.id;
    
    const [annual, setAnnual] = useState({
        annual_title: '',
        annual_start: '',
        annual_end: '',
        annual_content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnnual((prevAnnual) => ({
            ...prevAnnual,
            [name]: value,
        }));
    };
    
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
                    setAnnual(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [annual_id]);

    const handleConfirm = () => {
        const token = localStorage.getItem('token')

        axios
            .put(`http://localhost:8081/guest/attendance/annualDetail/${annual_id}`, annual, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("신청 완료:", response.data);
                router.push('/guest/attendance/annuallist');
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const handlePdfDownload = () => {
        window.print(); // 브라우저 인쇄 
    };
    
    const startDate = new Date(annual.annual_start);
    const endDate = new Date(annual.annual_end);
    const writeDate = new Date(annual.annual_reg_date);

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
                            <td style={cellStyle}>{annual.annual_id}</td>
                            <th style={TableHead}>작성일자</th>
                            <td style={cellStyle}>{formattedWrite}</td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>제목</th>
                            <td style={cellStyle} colSpan="3">
                                <input type="text" name="annual_title" placeholder="제목입력~" size="30" value={annual.annual_title} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <td style={cellStyle}>
                                <label htmlFor="annual_start">시작일</label>
                                <input type="date" name="annual_start" value={annual.annual_start} onChange={handleInputChange} />
                            </td>
                            <td style={cellStyle}>
                                <label htmlFor="annual_end">종료일</label>
                                <input type="date" name="annual_end" value={annual.annual_end} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead} colSpan="4">내용</th>
                        </tr>

                        <tr style={rowStyle}>
                            <td style={cellStyle2} colSpan="4">
                                <input type="text" name="annual_content" placeholder="내용 입력~" style={{ width: "100%" , height: "100%"}} value={annual.annual_content} onChange={handleInputChange} />
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
                    onClick={() => router.push('/guest/attendance/annuallist')}
                >
                    취소
                </button>
            </div>
            <hr />
        </div>
    );
}

export default GuestAnnualModify;

GuestAnnualModify.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
