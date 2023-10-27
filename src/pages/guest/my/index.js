import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MainLayout from "@/components/layout/mainLayout";
import Header from "@/components/common/header";
import styled from "styled-components";
import rootStore from "@/stores/rootStore";

const Table = styled.table`
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const my = () => {
    const [member, setMember] = useState({});
    const router = useRouter();
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        console.log(id);

            axios
                .get(`http://localhost:8081/guest/my/member/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log('[myInfo] member', response.data)
                    setMember(response.data);
                    localStorage.setItem('user_id', response.data.id);
                })
                .catch((error) => {
                    console.log(error)
                });
        },[])

    return (
        <MainLayout>
            <Header/>
            <Table>
                <tbody>
                    <TableRow>
                        <TableCell>사원명</TableCell>
                        <TableCell>{member.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>사원이메일</TableCell>
                        <TableCell>{member.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>사원연락처</TableCell>
                        <TableCell>{member.tel}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>입사일</TableCell>
                        <TableCell>{member.hireday}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2">
                            <Button onClick={() => router.push(`/guest/my/myInfoEdit/${id}`)}>수정</Button>
                        </TableCell>
                        
                    </TableRow>
                </tbody>
            </Table>
        </MainLayout>
    )

    
}

export default my;