import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import MyCalendar from "@/components/calendar/MyCalendar";
import { useEffect, useState } from "react";
import axios from "axios";

const cellStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    height: "40px",
};

const cellStyle2 = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    height: "40px", // 높이 조정
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

const TableTitle = {
    backgroundColor: "#007BFF",
    color: "white",
};

// 연차 신청
function AnnualRegister () {
    const [annual, setAnnual] = useState({
        id: localStorage.getItem('user_id'),
        name: localStorage.getItem('user_name'),
        annual_title: '',
        annual_start: '',
        annual_end: '',
        annual_content: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAnnual((annual) => ({
            ...annual,
            [name]: value,
        }));
    };

    const router = useRouter();

const handleAnnualSubmit = () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        const name = localStorage.getItem('user_name');

        axios
            .post('http://localhost:8081/guest/attendance/annualRegister', annual, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                // POST 요청 완료 후 원하는 작업 수행
                console.log("신청 완료:", response.data);
                // 예: 페이지 이동
                router.push(`/guest/attendance/annuallist/${id}`);
            })
            .catch((error) => {
                console.error("에러 발생:", error);
                if (error.response) {
                    // 요청은 이루어졌지만 서버가 오류 상태 코드로 응답한 경우
                    console.log("데이터:", error.response.data);
                    console.log("상태:", error.response.status);
                } else if (error.request) {
                    // 요청은 이루어졌지만 응답을 받지 못한 경우
                    console.log("요청은 이루어졌지만 응답을 받지 못함");
                } else {
                    // 요청 설정 중에 문제가 발생한 경우
                    console.log("요청 설정 중 오류 발생:", error.message);
                }
            });
    };

    return (
        <div align="center">
            <AttenCal>
                <div style={{ border: "3px solid black", borderRadius: "20px", width: "100%", height: "100%", display: "flex"}}>
                    <MyCalendar />
                </div>
            </AttenCal>0
            <br/><br/><hr/><br/><br/>
            <div>
                <table style={tableStyle}>
                    <tbody>
                        <tr style={rowStyle}>
                            <th colSpan={4} style={TableTitle}>연차 신청서</th>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>
                                <label htmlFor="title">작성자번호</label>
                            </th>
                            <td>
                                <input type="text" name="id" size={30} value={annual.id} onChange={handleInputChange} readOnly/>
                            </td>
                            <th style={TableHead}>
                                <label htmlFor="reference">작성자명</label>
                            </th>
                            <td>
                                <input type="text" name="name" size={30} value={annual.name} onChange={handleInputChange} readOnly/>
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>
                                <label htmlFor="title">제목</label>
                            </th>
                            <td>
                                <input type="text" name="annual_title" placeholder="제목입력~" size={30} value={annual.annual_title} onChange={handleInputChange} />
                            </td>
                            <th style={TableHead}>
                                <label htmlFor="reference">참조</label>
                            </th>
                            <td>
                                <input type="text" id="reference" placeholder="참조 입력~" size={30} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <th style={TableHead}>
                                <label htmlFor="title">시작일</label>
                            </th>
                            <td>
                                <input type="date" name="annual_start" value={annual.annual_start} onChange={handleInputChange} />
                            </td>
                            <th style={TableHead}>
                                <label htmlFor="reference">종료일</label>
                            </th>
                            <td>
                                <input type="date" name="annual_end" value={annual.annual_end} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <td colSpan={4} style={cellStyle} >
                                <input type="text" name="annual_content" placeholder="내용 입력~" style={{width: "760px", height: "200px"}} value={annual.annual_content} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr style={rowStyle}>
                            <td colSpan={2} style={cellStyle}>
                                <input type="button" value={"신청하기"} style={{
                                    cursor: 'pointer',
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "20px",
                                    fontSize: "1rem",
                                }} onClick={handleAnnualSubmit} />
                            </td>

                            <td colSpan={2} style={cellStyle}>
                                <input type="button" value={"목록"} style={{
                                    cursor: 'pointer',
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "20px",
                                    fontSize: "1rem",
                                }} onClick={() => router.push(`/guest/attendance/annuallist/${annual.id}`)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
        </div>
    );
}

export default AnnualRegister;

AnnualRegister.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};


const MainComponent = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const AttenCal = styled.div`
    width: 40%;
    height: 100%;
    border: 2px solid #005FC5;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    margin-right: 10px;
`;