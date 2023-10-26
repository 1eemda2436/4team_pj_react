import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/common/header';

const notice = () => {
    const [data, setData] = useState([]);
    const [authority, setAuthority] = useState('');
    
    useEffect(() => {
        console.log(localStorage.getItem('auth'))
        setAuthority(localStorage.getItem('auth'))
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8081/guest/notice/noticeList',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
            setData(response.data)
            })
            .catch(err => {
            if (axios.isAxiosError(err)) {
                // setError(err.response.data.message);
            } else {
                setError('데이터를 가져오는 중 오류 발생');
            }
            })
    },[]);

    const router = useRouter();
    return(
        <Component>
            <Header/>
        <Container>
        <Section>
        <CommunityHeader>
        <Title>공지사항</Title>
        {(authority == "ROLE_MANAGER" || authority == "ROLE_ADMIN") && (
            <Button onClick={() => router.push('/admin/board/NoticeWrite')}>글쓰기</Button>
                )}
        </CommunityHeader>
        <Table>
        <thead>
                    <TableRow>
                        <TableHeader>글번호</TableHeader>
                        <TableHeader>제목</TableHeader>
                        <TableHeader>글내용</TableHeader>
                        <TableHeader>작성자</TableHeader>
                        <TableHeader>조회수</TableHeader>
                        <TableHeader></TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {data.map(item => (
                        <TableRow key={item.notice_id}>
                            <TableCell>{item.notice_id}</TableCell>
                            <TableCell>
                                <BoardItemTitle onClick={() => router.push(`notice/noticeDetail/${item.notice_id}`)}>
                                    {item.title}
                                </BoardItemTitle>
                            </TableCell>
                            <TableCell>{item.content}</TableCell>
                            <TableCell>{item.writer}</TableCell>
                            <TableCell>{item.hits}</TableCell>
                            
                        </TableRow>
                    ))}
                </tbody>
        </Table>
        </Section>
    </Container>
    </Component>
    )
}

export default notice;

notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
const Container = styled.div`
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Section = styled.div`
    margin: 20px 0;
`;

const CommunityHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

const TableHeader = styled.th`
    padding: 10px;
    background-color: #007bff;
    color: #fff;
`;

const TableCell = styled.td`
    padding: 10px;
`;

const BoardItemTitle = styled.div`
    cursor: pointer;
    color: #007bff;
    font-weight: bold;
`;

const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
const Title = styled.h1`
    font-size: 24px;
    margin: 0;
    padding: 10px 0;
    text-align: center;
`;

const Component = styled.div`

`;