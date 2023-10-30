import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components";
import Header from '@/components/common/header';
import MainLayout from "@/components/layout/mainLayout";

const MyInfoEdit = () => {
    const [memberInfo, setMemberInfo] = useState({});
    const router = useRouter();
    const id = localStorage.getItem('user_id');
    

    useEffect(() => {
        const token = localStorage.getItem('token')
            
            axios
                .get(`http://localhost:8081/guest/my/member/${id}`, {
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
            .post("http://localhost:8081/guest/my/memberModify", memberInfo,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                router.push('/guest/my');
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
                            <TableCell>
                                <input 
                                type="text" 
                                name="sign" 
                                value={memberInfo.sign}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <input 
                                type="text" 
                                name="name" 
                                value={memberInfo.name}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                                </TableCell>
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
                            <TableCell>
                                <input 
                                type="text" 
                                name="depart_name" 
                                value={memberInfo.depart_name}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>팀명</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="team_name" 
                                value={memberInfo.team_name}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>사원 번호</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="id" 
                                value={memberInfo.id}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>직급</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="rank" 
                                value={memberInfo.rank}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input 
                                type="text" 
                                name="name" 
                                value={memberInfo.name}
                                onChange={MemberInfoChange}
                                />
                            </TableCell>
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
                            <TableCell>
                                <input 
                                type="text" 
                                name="resident" 
                                value={memberInfo.resident}
                                onChange={MemberInfoChange}
                                readOnly
                                />
                            </TableCell>
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
            <Button onClick = {() => router.push('/guest/my')}>취소</Button>
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
            