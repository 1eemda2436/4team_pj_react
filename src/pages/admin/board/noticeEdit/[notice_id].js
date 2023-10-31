import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeEdit = () => {
    const router = useRouter();
    const { notice_id } = router.query;
    const currentDate = new Date().toISOString().slice(0, 10); // 현재 날짜를 ISO 형식으로 가져오기
    console.log("notice_id",notice_id)
    const [formData, setFormData] = useState({
        title: '', // 제목 초기값
        content: '', // 내용 초기값
        reg_date: currentDate,
        notice_id: notice_id,
    });

    useEffect(() => {
        if (notice_id) {
            // API 호출을 통해 기존 데이터를 불러오기
            axios.get(`http://localhost:8081/guest/notice/noticeFind/${notice_id}`)
                .then(response => {
                    console.log(response.data[0])
                    response.data[0].reg_date = new Date(response.data[0].reg_date).toISOString()
                    const { title, content, reg_date } = response.data[0];
                    console.log(title, content, reg_date)
                    setFormData({ title, content, reg_date: reg_date.slice(0, 10) });
                })
                .catch(error => {
                    console.error('기존 데이터를 불러오는 중 오류 발생:', error);
                });
        }
    }, [notice_id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log('notice_id:', notice_id);
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditBoard = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (notice_id) {
            axios.put(`http://localhost:8081/admin/notice/editNotice/${notice_id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('게시물 수정 성공:', response.data);
                    router.push('/admin/board');
                })
                .catch(error => {
                    console.error('게시물 수정 오류:', error);
                });
        }
    };

    return (
        <>
        <Title>공지사항 수정</Title>
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
                <Button onClick={handleEditBoard}>수정</Button>
                <Button onClick={() => router.push('/admin/board')}>취소</Button>
            </BtnContainer>
        </Container>
        </>
        
        
    );
}

export default NoticeEdit;

NoticeEdit.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

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
