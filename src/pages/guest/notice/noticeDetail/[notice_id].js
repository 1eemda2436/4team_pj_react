import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';

const NoticeDetails = () => {
    const [noticeData, setNoticeData] = useState({}); // 빈 객체로 초기화
    const [authority, setAuthority] = useState('');
    const router = useRouter();
    const { notice_id } = router.query;

    useEffect(() => {
        console.log(localStorage.getItem('auth'))
        setAuthority(localStorage.getItem('auth'))
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (notice_id) {
            axios.get(`http://localhost:8081/guest/notice/noticeFind/${notice_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setNoticeData(response.data[0]);
            }).catch(error => {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            });
        }
    }, [notice_id]);

    const deleteNotice = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token')
    // 여러 아이템을 삭제할 때는 배열 형태로 서버에 전달합니다.
    axios.delete(`http://localhost:8081/admin/notice/deleteNotice/${notice_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log("Delete response:", response);
        router.push('/guest/notice')
    })
    .catch((error) => {
        console.log(error);
    });
};

    const Title = styled.h1`
        font-size: 24px;
        margin: 0;
        padding: 10px 0;
        text-align: center;
    `;

    const ContentContainer = styled.div`
        // 스타일 정의
    `;

    return (
        <Container>
            <Title>공지사항 상세</Title>

            <Table>
                <thead>
                <TableRow>
                    <TableCell>제목</TableCell>
                    <TableCell>글내용</TableCell>
                    <TableCell>조회수</TableCell>
                </TableRow>
                </thead>
                <tbody>
                {noticeData.content && (
                    <TableRow key={noticeData.notice_id}>
                        <TableCell>
                            {noticeData.title}
                        </TableCell>
                        <TableCell>
                            <ContentContainer>
                                {noticeData.content}
                            </ContentContainer>
                        </TableCell>
                        <TableCell>
                            <ContentContainer>
                                {noticeData.hits}
                            </ContentContainer>
                        </TableCell>
                    </TableRow>
                )}
                </tbody>
            </Table>
            <BackButton onClick={() => router.back()}>이전</BackButton>
            {(authority == "ROLE_MANAGER" || authority == "ROLE_ADMIN") && (
            <BackButton onClick={deleteNotice}>삭제</BackButton>)}
        </Container>
    );
}

export default NoticeDetails;

NoticeDetails.getLayout = function getLayout(page) {
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

const BackButton = styled.div`
    cursor: pointer;
    font-size: 24px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

const TableCell = styled.td`
    padding: 8px;
    // 다른 스타일 정의
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
