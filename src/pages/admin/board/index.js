import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import moment from 'moment';
import styled from 'styled-components';
import AdminLayout from '@/components/layout/adminLayout';
import { BASE_URL } from '@/api/apiPath';

const Notice = () => {
    const [data, setData] = useState([]);
    const [noticeData, setNoticeData] = useState([]);
    const [selectedNoticeItems, setSelectedNoticeItems] = useState([]);
    const [selectedCommunityItems, setSelectedCommunityItems] = useState([]);
    const [noticeSelectAll, setNoticeSelectAll] = useState(false);
    const [communitySelectAll, setCommunitySelectAll] = useState(false);
    const [authority, setAuthority] = useState('');
    const router = useRouter();

    useEffect(() => {
        setAuthority(localStorage.getItem('auth'));
    }, []);

    const handleCheckboxChange = (itemId, isNoticeTable) => {
        const itemIdInt = parseInt(itemId, 10);
        if (isNoticeTable) {
            setSelectedNoticeItems(prevState => {
                if (prevState.includes(itemIdInt)) {
                    return prevState.filter(item => item !== itemIdInt);
                } else {
                    return [...prevState, itemIdInt];
                }
            });
        } else {
            setSelectedCommunityItems(prevState => {
                if (prevState.includes(itemIdInt)) {
                    return prevState.filter(item => item !== itemIdInt);
                } else {
                    return [...prevState, itemIdInt];
                }
            });
        }
    };

    const handleNoticeSelectAll = () => {
        if (noticeSelectAll) {
            setSelectedNoticeItems([]);
        } else {
            const allItemIds = noticeData.map(item => item.notice_id);
            setSelectedNoticeItems(allItemIds);
        }
        setNoticeSelectAll(prevState => !prevState);
    };

    const handleCommunitySelectAll = () => {
        if (communitySelectAll) {
            setSelectedCommunityItems([]);
        } else {
            const allItemIds = data.map(item => item.board_id);
            setSelectedCommunityItems(allItemIds);
        }
        setCommunitySelectAll(prevState => !prevState);
    };

    const isSelected = (itemId, isNoticeTable) => {
        if (isNoticeTable) {
            return selectedNoticeItems.includes(itemId);
        } else {
            return selectedCommunityItems.includes(itemId);
        }
    };

    const deleteSelectedItems = async (isNoticeTable) => {
        const token = localStorage.getItem('token');
        const selectedItemsToDelete = isNoticeTable ? selectedNoticeItems : selectedCommunityItems;
        if (selectedItemsToDelete.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }
        const deletePromises = selectedItemsToDelete.map(itemId => {
            const url = isNoticeTable
                ? `${BASE_URL}/admin/notice/deleteNotice/${itemId}`
                : `${BASE_URL}/guest/community/boardDelete/${itemId}`;
            return axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        });

        try {
            await Promise.all(deletePromises);
            alert('삭제되었습니다.');
            refreshData();
        } catch (error) {
            console.error('선택한 항목 삭제 중 오류 발생:', error);
        }
    };

    const refreshData = () => {
        const token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/guest/community/list`, {
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

        axios.get(`${BASE_URL}/guest/notice/noticeList`, {
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
        router.push({
            pathname: '/guest/community/BoardWrite',
            query: { id: user_id }
        });
    };

    const goToNoticeWrite = () => {
        router.push('/admin/board/NoticeWrite');
    };

    return (
        <MainComponent>
            <MainTitle>게시판관리</MainTitle>
            <Section>
                <CommunityHeader>
                    <Title>공지사항</Title>
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={goToNoticeWrite}>글쓰기</Button>
                    )}
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={handleNoticeSelectAll}>전체 선택</Button>
                    )}
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={() => deleteSelectedItems(true)}>선택 삭제</Button>
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
                                        onChange={() => handleCheckboxChange(item.notice_id, true)}
                                        checked={isSelected(item.notice_id, true)}
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
                        <Button onClick={handleCommunitySelectAll}>전체 선택</Button>
                    )}                
                    {(authority === "ROLE_ADMIN") && (
                        <Button onClick={() => deleteSelectedItems(false)}>선택 삭제</Button>
                    )}
                    
                </CommunityHeader>

                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>글번호</TableHeader>
                            <TableHeader>제목</TableHeader>
                            <TableHeader>글내용</TableHeader>
                            <TableHeader>작성자ID</TableHeader>
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
                                        onChange={() => handleCheckboxChange(item.board_id, false)}
                                        checked={isSelected(item.board_id, false)}
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
