import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Community = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    // 체크박스를 토글하고 선택한 항목을 업데이트합니다.
    const handleCheckboxChange = (itemId) => {
        if (isSelected(itemId)) {
            setSelectedItems(selectedItems.filter(item => item !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // 해당 아이템이 선택되었는지 확인합니다.
    const isSelected = (itemId) => selectedItems.includes(itemId);

    const deleteSelectedItems = (board_id) => {
        // 선택한 항목을 삭제하는 API 요청을 보내십시오.
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8081/guest/community/boardDelete/${board_id}`, {
            itemIds: selectedItems,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // 삭제가 성공하면 선택 항목과 데이터를 업데이트합니다.
            setSelectedItems([]);
            refreshData();
        })
        .catch(err => {
            console.error('선택한 항목 삭제 중 오류 발생:', err);
        });
    };

    const refreshData = () => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8081/guest/community/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(err => {
            if (axios.isAxiosError(err)) {
                setError(err.response.data.message);
            } else {
                setError('데이터를 가져오는 중 오류 발생');
            }
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    const router = useRouter();

    const goToBoardWrite = () => {
        router.push('/guest/community/BoardWrite');
    }

    return (
        <Container>
            <Section>
                <CommunityHeader>
                    <Title>자유게시판</Title>
                    <Button onClick={goToBoardWrite}>글쓰기</Button>
                    <Button onClick={deleteSelectedItems}>선택 삭제</Button>
                </CommunityHeader>

                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>글번호</TableHeader>
                            <TableHeader>제목</TableHeader>
                            <TableHeader>글내용</TableHeader>
                            <TableHeader>사진</TableHeader>
                            <TableHeader>조회수</TableHeader>
                            <TableHeader>작성자</TableHeader>
                            <TableHeader>선택</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <TableRow key={item.board_id}>
                                <TableCell>{item.board_id}</TableCell>
                                <TableCell>
                                    <BoardItemTitle onClick={() => router.push(`/guest/community/boardDetail/${item.board_id}`)}>
                                        {item.title}
                                    </BoardItemTitle>
                                </TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{item.board_file}</TableCell>
                                <TableCell>{item.hits}</TableCell>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(item.board_id)}
                                        checked={isSelected(item.board_id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </Section>
        </Container>
    );
}

export default Community;

Community.getLayout = function getLayout(page) {
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