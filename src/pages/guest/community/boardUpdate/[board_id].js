import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/common/header";

const boardUpdate = () => {
    const router = useRouter();
    const { id } = router.query;
    const { board_id } = router.query;
    
    const [formData, setFormData] = useState({
        category_id: "",
        id: id, 
        title: "",
        content: "",
        board_id: board_id,
        reg_date: new Date().toISOString().slice(0, 10), // 오늘 날짜를 ISO 형식으로 가져오기 (YYYY-MM-DD),
    });

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
        }));
    }, []); // 컴포넌트가 마운트될 때만 실행
    
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

    useEffect(() => {
        if(board_id) {
        const token = localStorage.getItem('token')
        // 게시글 목록을 가져오는 요청
        axios.get(`http://localhost:8081/guest/community/boardFind/${board_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) // 서버의 게시글 목록 API 엔드포인트를 사용
        .then(response => {
            const { category_id, id, title, content, reg_date } = response.data[0];
            // reg_date 값을 Date 객체로 변환합니다.
            const formattedDate = new Date(reg_date);
            // 필요한 형식으로 날짜를 포맷팅합니다.
            const formattedDateString = formattedDate.toISOString().slice(0, 10);
            // reg_date 값을 상태로 설정합니다.
            setFormData(prevState => ({
                ...prevState,
                category_id,
                id,
                title,
                content,
                reg_date: formattedDateString, // 포맷팅된 날짜를 설정합니다.
                }));
            })
            .catch(error => {
                console.error('게시글 가져오기 오류:', error);
            });
        }
    }, [board_id]);

    // 게시물을 서버에 수정하는 함수
    const handlePostBoard = () => {
        const token = localStorage.getItem('token')
        formData.board_id = board_id
        axios.put(`http://localhost:8081/guest/community/edit/${board_id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) // 게시물 데이터를 서버에 POST 요청으로 보냄
            .then(response => {
                console.log('게시물 수정 성공:', response.data);
                router.push('/guest/community'); // 게시판 페이지로 이동
            })
            .catch(error => {
                console.error('게시물 수정 오류:', error);
            });
    };

    // 입력 폼의 값을 업데이트하는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return(
        <>
        <Header />
        <Title>자유게시판 수정</Title>
        <Container>
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
                        <Input type="date" name="reg_date" value={formData.reg_date} readOnly />
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
            <Button onClick={handlePostBoard}>수정</Button>
            <Button onClick={() => router.back()}>이전</Button>
            </ButtonContainer>
        </Container>
        </>
    )
}

export default boardUpdate;

boardUpdate.getLayout = function getLayout(page) {
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
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    margin-right: 20px;
    text-align: center;
`;

const Title = styled.div`
    font-size: 26px;
    font-weight: 700;
    color: #000000;
    margin: 20px 20px;
`;