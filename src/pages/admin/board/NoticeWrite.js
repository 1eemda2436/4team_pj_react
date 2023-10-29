import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import styled from "styled-components";
import React, { useState } from 'react';
import axios from 'axios';


const NoticeWrite = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
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
        axios.post('http://localhost:8081/admin/notice/addNotice', formData,{
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
        <Container>
            <Title>공지사항 등록</Title>
            <Content>
                <div>
                    <div>제목</div>
                    <Input type="text" name="title" onChange={handleInputChange} value={formData.title} />
                </div>
                <div>
                    <div>내용</div>
                    <input type="text" name="content" onChange={handleInputChange} value={formData.content} rows="10" cols="50" />
                </div>
                <div>
                    <div>관리자 (체크박스 진행)</div>
                    <div>부서장 (체크박스 진행)</div>
                    <div>팀장 (체크박스 진행)</div>
                    <div>전 사원 (체크박스 진행)</div>
                </div>
            </Content>
            <ButtonContainer>
                <Button onClick={handlePostBoard}>등록</Button>
                <Button onClick={() => router.push('/admin/board')}>취소</Button>
            </ButtonContainer>
        </Container>
    );
}

export default NoticeWrite;

NoticeWrite.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

// onClick={() => router.push('/guest')}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
    font-size: 24px;
    margin: 0;
    padding: 10px 0;
    text-align: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`;