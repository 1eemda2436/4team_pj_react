import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/common/header';
import moment from 'moment';

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
            <Title>공지사항</Title>
        <Container>

            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>글번호</TableHeader>
                        <TableHeader>제목</TableHeader>
                        <TableHeader>작성일</TableHeader>
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
                                <TableCell>{moment(item.reg_date).format('YYYY-MM-DD')}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
            </Table>
        </Container>
    {(authority == "ROLE_MANAGER" || authority == "ROLE_ADMIN") && (
            <Button onClick={() => router.push('/admin/board/noticeWrite')}>글쓰기</Button>
                )}
    </Component>
    )
}

export default notice;

notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th {
    padding: 20px 15px;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    white-space: nowrap;
    }

    td {
        padding: 15px;
        vertical-align: middle;
        font-size: 13px;
        border-bottom: solid 1px #E5E5E5;
        text-align: center;
        word-wrap: break-word;
    }
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
    border-radius: 10px; /* 각 행에 둥근 모서리 스타일 추가 */
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
    color: #000000;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff; /* 파란색 배경 */
    color: #fff; /* 흰색 글씨 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px 150px 0px 30px; /* 상단, 좌측, 하단, 우측 마진 (오른쪽으로 이동) */
`;
const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: #000000;
    margin: 20px 20px;
`;

const Component = styled.div`

`;