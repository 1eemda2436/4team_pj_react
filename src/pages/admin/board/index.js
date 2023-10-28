import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import rootStore from "@/stores/rootStore";
import Header from "@/components/common/header";

const Notice = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [noticeData, setNoticeData] = useState([]);
    
    const router = useRouter();

    // 체크박스를 토글하는 함수
    const handleCheckboxChange = (itemId) => {
        const itemIdInt = parseInt(itemId, 10);
        if (isSelected(itemId)) {
            setSelectedItems(selectedItems.filter(item => item !== itemIdInt));
        } else {
            setSelectedItems([...selectedItems, itemIdInt]);
        }
    };

    // 해당 아이템이 선택되었는지 확인하는 함수
    const isSelected = (itemId) => selectedItems.includes(itemId);

    // 선택된 항목 삭제 함수
    const deleteSelectedItems = () => {
        if (selectedItems.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        const token = localStorage.getItem('token');
        const deletePromises = selectedItems.map(itemId => {
            return axios.delete(`http://localhost:8081/admin/notice/deleteNotice/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        .then(response => {
            console.log("Delete response:", response);
          // 삭제가 성공하면 선택 항목과 데이터를 업데이트합니다.
            setSelectedItems([]);
            refreshData();
        })
        .catch(err => {
            console.error('선택한 항목 삭제 중 오류 발생:', err);
        });
    })
};
    // 데이터를 다시 불러오는 함수
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
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8081/guest/notice/noticeList', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setNoticeData(response.data)
        })
        .catch(err => {
            if (axios.isAxiosError(err)) {
                // setError(err.response.data.message);
            } else {
                setError('데이터를 가져오는 중 오류 발생');
            }
        })
    }, []);

    const goToBoardWrite = () => {
        router.push('/guest/community/BoardWrite');
    }

    const goToNoticeWrite = () => {
        router.push('/admin/board/NoticeWrite');
    }

    return (
        <MainComponent>
            <Title>게시판관리</Title>
            <Section>
            <CommunityHeader>
            <BoardTitle>공지사항</BoardTitle>
            <Button onClick={goToNoticeWrite}>글쓰기</Button>
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
                    {noticeData.map(item => (
                        <TableRow key={item.notice_id}>
                            <TableCell>{item.notice_id}</TableCell>
                            <TableCell>
                                <BoardItemTitle onClick={() => router.push(`notice/NoticeDetail/${item.notice_id}`)}>
                                    {item.title}
                                </BoardItemTitle>
                            </TableCell>
                            <TableCell>{item.content}</TableCell>
                            <TableCell>{item.board_file}</TableCell>
                            <TableCell>{item.hits}</TableCell>
                            <TableCell>{item.writer}</TableCell>
                            <TableCell>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange(item.notice_id)}
                                checked={isSelected(item.notice_id)}
                            />
            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
        </Table>
            </Section>

            <Section>
                <CommunityHeader>
                    <BoardTitle>자유게시판</BoardTitle>
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
        </MainComponent>
    );
}

export default Notice;

Notice.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainComponent = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Title = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
`;

const Container = styled.div`
    height: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
`;

const CommunityHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Section = styled.div`
    margin: 20px 0;
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

const LinkItem = styled.div`
    cursor: pointer;
    color: #007bff;
`;

const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const BoardTitle = styled.h1`
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