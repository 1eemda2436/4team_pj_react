import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Header from '@/components/common/header';
import MainLayout from "@/components/layout/mainLayout";
import { BASE_URL } from '@/api/apiPath';

const MyInfoEdit = () => {
    const [memberInfo, setMemberInfo] = useState({});
    const router = useRouter();
    const id = localStorage.getItem('user_id');
    

    useEffect(() => {
        const token = localStorage.getItem('token')
            
            axios
                .get(`${BASE_URL}/guest/personnel/member/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log('MyInfoEdit] memberInfo', response.data)
                    setMemberInfo(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
    }, [])

    const MemberInfoChange = (event) => {
        console.log(event.target.value)

        setMemberInfo(prevMember => ({
            ...prevMember, //... => 객체에 사용하면 이전 객체 복사
            [event.target.name]: event.target.value
        }));
    };

    const saveMemberInfo = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token')

        console.log('[saveMemberInfo] memberInfo', memberInfo)

        axios
            .put(`${BASE_URL}/guest/personnel/memberModify/${id}`, memberInfo,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                router.push('/guest/personnel');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <MainLayout>
            <Header />
            <Title>마이페이지</Title>
            <TableWrapper>
                <LeftTable>
                    <tbody>
                        <TableRow>
                            <TableCell>{memberInfo.sign}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{memberInfo.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <input 
                                type="text" 
                                name="email" 
                                value={memberInfo.email}
                                onChange={MemberInfoChange}
                                />
                                </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <input 
                                type="text" 
                                name="tel" 
                                value={memberInfo.tel}
                                onChange={MemberInfoChange}
                                />
                            </TableCell>
                        </TableRow>
                    </tbody>
                </LeftTable>
                <RightTable>
                    <tbody>
                        <TableRow>
                            <TableCell>부서명</TableCell>
                            <TableCell>{memberInfo.depart_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>팀명</TableCell>
                            <TableCell>{memberInfo.team_name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>사원 번호</TableCell>
                            <TableCell>{memberInfo.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>직급</TableCell>
                            <TableCell>{memberInfo.rank}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>{memberInfo.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이메일</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="email" 
                                value={memberInfo.email}
                                onChange={MemberInfoChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>전화번호</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="tel" 
                                value={memberInfo.tel}
                                onChange={MemberInfoChange}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주민번호</TableCell>
                            <TableCell>{memberInfo.resident}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>계좌</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="bank" 
                                value={memberInfo.bank}
                                onChange={MemberInfoChange}
                                />
                            </TableCell>
                        </TableRow>
                    </tbody>
                </RightTable>
            </TableWrapper>
            <Button onClick = {saveMemberInfo}>수정</Button>
            <Button onClick = {() => router.push('/guest/personnel')}>취소</Button>
        </MainLayout>
    )    
}

export default MyInfoEdit;

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

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
    margin: 20px 20px;
`;
            