import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import MainLayout from "@/components/layout/mainLayout";
import Header from "@/components/common/header";
import styled from "styled-components";

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
            <Header />
            <Title>마이페이지</Title>
            <br/>
            <TableWrapper>
                <LeftTable>
                    <tbody>
                        <TableRow>
                            <TableCell>{member.sign}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{member.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{member.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{member.tel}</TableCell>
                        </TableRow>
                    </tbody>
                </LeftTable>
                <RightTable>
                    <tbody>
                        <TableRow>
                            <TableCell>부서명</TableCell>
                            <TableCell>{member.depart_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>팀명</TableCell>
                            <TableCell>{member.team_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>사원 번호</TableCell>
                            <TableCell>{member.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>직급</TableCell>
                            <TableCell>{member.rank}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>{member.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이메일</TableCell>
                            <TableCell>{member.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>전화번호</TableCell>
                            <TableCell>{member.tel}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주민번호</TableCell>
                            <TableCell>{member.resident}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>계좌</TableCell>
                            <TableCell>{member.bank}</TableCell>
                        </TableRow>
                    </tbody>
                </RightTable>
            </TableWrapper>
            <br/>
            <Button onClick={() => router.push(`/guest/my/myInfoEdit/${member.id}`)}>수정</Button>
        </MainLayout>
    );

    
}

export default my;

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: #000000;
    margin: 20px 20px;
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

const TableWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
`;

const LeftTable = styled.table`
    width: 45%;
    border-collapse: collapse;
    
`;

const RightTable = styled.table`
    width: 45%;
    border-collapse: collapse;
`;
