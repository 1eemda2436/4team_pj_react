import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "@/components/common/header";

const BoardWrite = () => {
    const router = useRouter();
    const { id } = router.query;
    //const id = localStorage.getItem('user_id'); // 로컬 스토리지에서 사용자 ID 가져오기

    const [formData, setFormData] = useState({
        category_id: "",
        id: id, 
        title: "",
        content: "",
        reg_date: new Date().toISOString().slice(0, 10), // 현재 날짜를 ISO 형식으로 가져오기
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

    return(
        <>
        <Header />
        <Title>자유게시판 등록</Title>
        <Container>
            <Table>
                <tbody>
                    <TableRow>
                        <TableCell1>카테고리 선택</TableCell1>
                        <TableCell>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                            style={{ width: '100%', height: '40px', borderRadius: '5px' }}
                        >
                            <option value="">카테고리 선택</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell1>작성자</TableCell1>
                        <TableCell1><Input type="text" name="id" value={formData.id} readOnly /></TableCell1>
                    </TableRow>
                    <TableRow>
                        <TableCell1>제목</TableCell1>
                        <TableCell1><Input type="text" name="title" onChange={handleInputChange} value={formData.title} /></TableCell1>
                    </TableRow>
                    <TableRow>
                        <TableCell1>작성일</TableCell1>
                        <TableCell1><Input type="date" name="reg_date" value={formData.reg_date} readOnly /></TableCell1>
                    </TableRow>
                    <TableRow>
                        <TableCell1>글내용</TableCell1>
                        <TableCell1><TextArea name="content" onChange={handleInputChange} value={formData.content} rows="30" cols="100"/></TableCell1>
                    </TableRow>
                </tbody>
            </Table>
            <BtnContainer>
                <Button onClick={handlePostBoard}>등록</Button>
                <Button onClick={() => router.back()}>이전</Button>
            </BtnContainer>
        </Container>
        </>

        
    )
}

export default BoardWrite;

BoardWrite.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

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

const TableCell1 = styled.td`
    padding: 8px;
    font-weight: bold;
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
    color: #000000;
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

const BtnContainer = styled.div`
    display: flex;
    margin-top: 70px;
    align-items: center;

`;

const TextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;