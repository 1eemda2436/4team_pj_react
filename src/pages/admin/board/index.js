import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import moment from 'moment';

const Notice = () => {
    const [data, setData] = useState([]);
    const [noticeData, setNoticeData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태를 저장하는 state
    const [authority, setAuthority] = useState('');
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

    // 전체 선택 체크박스를 토글하는 함수(공지사항)
    const noticehandleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]); // 전체 선택 해제
        } else {
            // 모든 항목의 ID를 배열에 넣어 전체 선택
            const allItemIds = noticeData.map(item => item.notice_id);
            setSelectedItems(allItemIds);
        }
        setSelectAll(!selectAll); // 전체 선택 상태를 토글
    };
    
    // 전체 선택 체크박스를 토글하는 함수(게시판)
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]); // 전체 선택 해제
        } else {
            // 모든 항목의 ID를 배열에 넣어 전체 선택
            const allItemIds = data.map(item => item.board_id);
            setSelectedItems(allItemIds);
        }
        setSelectAll(!selectAll); // 전체 선택 상태를 토글
    };

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
            });
        });

        Promise.all(deletePromises)
            .then(() => {
                setSelectedItems([]);
                refreshData();
            })
            .catch(err => {
                console.error('선택한 항목 삭제 중 오류 발생:', err);
            });
    };

    const communitydeleteSelectedItems = () => {
        if (selectedItems.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }

        const token = localStorage.getItem('token');
        const deletePromises = selectedItems.map(board_id => {
            return axios.delete(`http://localhost:8081/guest/community/boardDelete/${board_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        });

        Promise.all(deletePromises)
            .then(() => {
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
            console.error('데이터를 가져오는 중 오류 발생:', err);
        });

        axios.get('http://localhost:8081/guest/notice/noticeList', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setNoticeData(response.data);
        })
        .catch(err => {
            console.error('데이터를 가져오는 중 오류 발생:', err);
        });
    };

    useEffect(() => {
        refreshData();
    }, []);

    const goToBoardWrite = () => {
        const user_id = localStorage.getItem('user_id');
        //router.push(`/guest/community/BoardWrite/`);
        router.push({
            pathname: '/guest/community/BoardWrite',
            query: { id: user_id }
        });
        
    }

    const goToNoticeWrite = () => {
        router.push('/admin/board/noticeWrite');
    };

    return (
        <MainComponent>
            <MainTitle>게시판관리</MainTitle>
            <Section>
                <CommunityHeader>
                    <Title>공지사항</Title>
                    <Button onClick={goToNoticeWrite}>글쓰기</Button>
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={noticehandleSelectAll}>전체 선택</Button>
                    )}
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={deleteSelectedItems}>선택 삭제</Button>
                    )}                    
                    
                </CommunityHeader>
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>글번호</TableHeader>
                            <TableHeader>제목</TableHeader>
                            <TableHeader>글내용</TableHeader>
                            <TableHeader>작성일</TableHeader>
                            <TableHeader>선택</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {noticeData.map(item => (
                            <TableRow key={item.notice_id}>
                                <TableCell>{item.notice_id}</TableCell>
                                <TableCell>
                                    <BoardItemTitle onClick={() => router.push(`/guest/notice/noticeDetail/${item.notice_id}`)}>
                                        {item.title}
                                    </BoardItemTitle>
                                </TableCell>
                                <TableCell>{item.content}</TableCell>
                                <TableCell>{moment(item.reg_date).format('YYYY-MM-DD')}</TableCell>
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
            <br/>
            <br/>
            <Section>
                <CommunityHeader>
                    <BoardTitle>자유게시판</BoardTitle>
                    <Button onClick={goToBoardWrite}>글쓰기</Button>
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={handleSelectAll}>전체 선택</Button>
                    )}                
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={communitydeleteSelectedItems}>선택 삭제</Button>
                    )}
                    
                </CommunityHeader>

                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>글번호</TableHeader>
                            <TableHeader>제목</TableHeader>
                            <TableHeader>글내용</TableHeader>
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
const MainTitle = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
`;

const Title = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: #000000;
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

const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const BoardTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #000000;
`;

const BoardItemTitle = styled.div`
    cursor: pointer;
    color: #007bff;
    font-weight: bold;
`;
