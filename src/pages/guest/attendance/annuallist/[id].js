import React, { Component, useEffect, useState } from "react";
import MainLayout from "@/components/layout/mainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const AnnualTitle = styled.h1`
    font-size: 50px;
    font-weight: bold;
    margin-bottom: 50px;
    margin-top: 30px;
`;

const Table = styled.table`
    border-collapse: collapse;
    width: 800px; /* 원래 크기 유지 */
`;

const TableHead = styled.thead`
    background-color: #007bff;
    color: #fff;
`;

const TableRow = styled.tr`
    transition: background-color 0.3s;
    &:hover {
    background-color: #f5f5f5;
}
`;

const TableHeaderCell = styled.th`
    padding: 12px;
    border: 1px solid #ccc;
`;

const TableCell = styled.td`
    padding: 12px;
    border: 1px solid #ccc;
`;

const DocumentLink = styled.a`
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
`;

function GuestAnnualList() {
    const [attendance, setAttendance] = useState([]);
    const router = useRouter();
    const annual_id = router.query.id;
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        axios
            .get(`http://localhost:8081/guest/attendance/annualGuestList/${annual_id}`, {
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
    }, []);

return (
<PageContainer>
    <AnnualTitle>연차 신청 내역</AnnualTitle>
    <Table>
    <TableHead>
        <TableRow>
        <TableHeaderCell>문서번호</TableHeaderCell>
        <TableHeaderCell>문서 제목</TableHeaderCell>
        <TableHeaderCell>승인여부</TableHeaderCell>
        </TableRow>
    </TableHead>
    <tbody>
        {attendance.map((annual) => (
        <TableRow key={annual.annual_id}>
            <TableCell align="center">{annual.annual_id}</TableCell>
            <TableCell>
            <DocumentLink align="center"
                onClick={() =>
                router.push(`/guest/attendance/annualDetail/${annual.annual_id}`)
                }
            >
                {annual.annual_title}
            </DocumentLink>
            </TableCell>
            <TableCell align="center">{annual.confirm}</TableCell>
        </TableRow>
        ))}
    </tbody>
    </Table>
    <br/><br/>
    <div>
        <input type="button" value={"글 쓰기"} style={{
            cursor: 'pointer',
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "1rem",
        }} onClick={() => router.push('/guest/attendance/register/annualRegister')} />
    </div>
</PageContainer>
);
}

export default GuestAnnualList;

GuestAnnualList.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const TextTitle = styled.div`
    font-size: 36px;
    font-weight: bold;
    padding: 30px 30px;
`;