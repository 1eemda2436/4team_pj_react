import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardWrite = () => {
    const router = useRouter();
    const { id } = router.query;
    //const id = localStorage.getItem('user_id'); // 로컬 스토리지에서 사용자 ID 가져오기

    const [formData, setFormData] = useState({
        category_id: "",
        id: id, 
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10), // 현재 날짜를 ISO 형식으로 가져오기
    });

    const [categories, setCategories] = useState([]); // 카테고리 목록을 저장할 상태

    useEffect(() => {
        
        const token = localStorage.getItem('token')
        // 서버에서 카테고리 목록을 가져오는 요청
        axios.get('http://localhost:8081/guest/community/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) // 서버의 카테고리 목록 API 엔드포인트를 사용
            .then(response => {
                setCategories(response.data); // 가져온 카테고리 목록을 설정
                console.log(response.data);
            })
            .catch(error => {
                console.error('카테고리 가져오기 오류:', error);
            });
    }, []);

    // 입력 폼의 값을 업데이트하는 함수
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
        axios.post(`http://localhost:8081/guest/community/add`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) // 게시물 데이터를 서버에 POST 요청으로 보냄
            .then(response => {
                console.log('게시물 등록 성공:', response.data);
                router.push('/guest/community'); // 게시판 페이지로 이동
            })
            .catch(error => {
                console.error('게시물 등록 오류:', error);
            });
    };

    return (
        <Container>
            <Title>자유게시판 등록</Title>
            <Content>
                <Row>
                    <div>
                        <div>카테고리</div>
                        {/* <Input type="text" name="category_id" onChange={handleInputChange} value={formData.category_id} /> */}
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                        >
                            <option value="">카테고리 선택</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div>작성자</div>
                        <Input type="text" name="id" value={formData.id} readOnly />
                    </div>
                    <div>
                        <div>제목</div>
                        <Input type="text" name="title" onChange={handleInputChange} value={formData.title} />
                    </div>
                    <div>
                        <div>작성일</div>
                        <Input type="date" name="date" value={formData.date} readOnly />
                    </div>
                </Row>
                <Row>
                    <div>
                        <div>글내용</div>
                        <TextArea name="content" onChange={handleInputChange} value={formData.content} rows="30" cols="100"/>
                    </div>
                </Row>
            </Content>
            <ButtonContainer>
                <Button onClick={handlePostBoard}>등록</Button>
                <Button onClick={() => router.back()}>이전</Button>
            </ButtonContainer>
        </Container>
    );
}

export default BoardWrite;

BoardWrite.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

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