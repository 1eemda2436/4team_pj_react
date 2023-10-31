import React, { Component, useEffect, useState } from "react";
import AdminLayout from "@/components/layout/adminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BASE_URL } from "@/api/apiPath";

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

function AdminVacationList() {
    const [vacation, setVacation] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const company_id = localStorage.getItem('company_id')
        axios
            .get(`${BASE_URL}/all/attendance/vacationRequestsList/${company_id}`, {
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
    }, []);

    return (
        <PageContainer>
            <AnnualTitle>휴가 신청 내역</AnnualTitle>
            <Table>
            <TableHead>
                <TableRow>
                <TableHeaderCell>문서번호</TableHeaderCell>
                <TableHeaderCell>문서 제목</TableHeaderCell>
                <TableHeaderCell>승인여부</TableHeaderCell>
                </TableRow>
            </TableHead>
            <tbody>
                {vacation.map((vacat) => (
                <TableRow key={vacat.vacation_id}>
                    <TableCell align="center">{vacat.vacation_id}</TableCell>
                    <TableCell>
                    <DocumentLink align="center"
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                        router.push(`/admin/attendance/vacationDetail/${vacat.vacation_id}`)
                        }
                    >
                        {vacat.vacation_title}
                    </DocumentLink>
                    </TableCell>
                    <TableCell align="center">{vacat.confirm}</TableCell>
                </TableRow>
                ))}
            </tbody>
            </Table>
            <AttenBtnBox>
                <button
                    type="button"
                    onClick={() => router.push('/admin/attendance')}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        fontSize: "1rem",
                        margin: "5px",
                    }}
                >
                    Prev
                </button>
            </AttenBtnBox>
        </PageContainer>
    );
}

export default AdminVacationList;

AdminVacationList.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const AttenBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 120px;
`;