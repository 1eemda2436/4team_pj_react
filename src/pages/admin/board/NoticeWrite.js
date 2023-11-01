import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import styled from "styled-components";
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from "@/api/apiPath";


const NoticeWrite = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        reg_date: new Date().toISOString().slice(0, 10), // 현재 날짜를 ISO 형식으로 가져오기
    });
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 게시물을 서버에 등록하는 함수
    const handlePostBoard = () => {
        const token = localStorage.getItem('token')
        axios.post(`${BASE_URL}/admin/notice/addNotice`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) // 게시물 데이터를 서버에 POST 요청으로 보냄
            .then(response => {
                console.log('게시물 등록 성공:', response.data);
                router.push('/admin/board'); // 게시판 페이지로 이동
            })
            .catch(error => {
                console.error('게시물 등록 오류:', error);
            });
    };

    return (
        <>
        <Title>공지사항 등록</Title>
        <Container>
            <Table>
                <tbody>
                    <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell><Input type="text" name="title" onChange={handleInputChange} value={formData.title} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell><TextArea name="content" onChange={handleInputChange} value={formData.content} rows="10" cols="50" /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>작성일</TableCell>
                        <TableCell><Input type="date" name="reg_date" onChange={handleInputChange} value={formData.reg_date} readOnly /></TableCell>
                    </TableRow>
                </tbody>
            </Table>
            <BtnContainer>
                <Button onClick={handlePostBoard}>등록</Button>
                <Button onClick={() => router.push('/admin/board')}>취소</Button>
            </BtnContainer>
        </Container>
        </>
    );
}

export default NoticeWrite;

NoticeWrite.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

// onClick={() => router.push('/guest')}

const TextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
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
    &:last-child {
        border-bottom: none; // 마지막 행의 border-bottom을 제거합니다.
    }
`;

const TableCell = styled.td`
    padding: 8px;
    
`;

const BtnContainer = styled.div`
    display: flex;
    margin-top: 70px;
    align-items: center;

`;

const Container = styled.div`
    width: 100%;
    height: 30%;
    padding: 40px;
    box-sizing: border-box;
`;

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
    margin: 20px 20px;
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;


const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 20px;
`;