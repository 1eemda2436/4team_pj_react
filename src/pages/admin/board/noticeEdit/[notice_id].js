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
        <Container>
            <Title>공지사항 수정</Title>
            <Content>
                <div>
                    <div>제목</div>
                    <Input type="text" name="title" onChange={handleInputChange} value={formData.title} />
                </div>
                <div>
                    <div>내용</div>
                    <TextArea name="content" onChange={handleInputChange} value={formData.content} rows="10" cols="50" />
                </div>
                <div>
                    <div>작성일</div>
                    <Input type="date" name="reg_date" onChange={handleInputChange} value={formData.reg_date} readOnly />
                </div>
            </Content>
            <ButtonContainer>
                <Button onClick={handleEditBoard}>수정</Button>
                <Button onClick={() => router.push('/admin/board')}>취소</Button>
            </ButtonContainer>
        </Container>
    );
}

export default NoticeEdit;

NoticeEdit.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;


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

const BoardItemTitle = styled.div`
    cursor: pointer;
    color: #007bff;
    font-weight: bold;
`;

