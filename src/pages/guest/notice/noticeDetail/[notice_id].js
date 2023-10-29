import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';
import Header from '@/components/common/header';

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
        console.log("notice_id:", notice_id);
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
        <>
            <Header />
            <Container>
                <Title>공지사항 상세</Title>

                <Table>
                    <thead>
                        <TableRow>
                            <TableCell>제목</TableCell>
                            <TableCell>{noticeData.title}</TableCell>
                        </TableRow>
                    </thead>
                    <tbody>
                        {noticeData.content && (
                            <TableRow key={noticeData.notice_id}>
                                <TableCell>글내용</TableCell>
                                <TableCell>
                                    <ContentContainer>
                                        {noticeData.content}
                                    </ContentContainer>
                                </TableCell>
                            </TableRow>
                        )}
                    </tbody>
                </Table>
                <ButtonContainer>
                    <Button onClick={() => router.push('/guest/notice')}>목록</Button>
                    {(authority === "ROLE_MANAGER" || authority === "ROLE_ADMIN") && (
                        <Button onClick={() => router.push(`/admin/board/noticeEdit/${noticeData.notice_id}`)}>수정</Button>
                    )}
                    {(authority === "ROLE_MANAGER" || authority === "ROLE_ADMIN") && (
                        <Button onClick={deleteNotice}>삭제</Button>
                    )}
                </ButtonContainer>
            </Container>
        </>
    );
}

export default NoticeDetails;

NoticeDetails.getLayout = function getLayout(page) {
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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2; /* 흰색 배경색 */
    }

    &:nth-child(odd) {
        background-color: #ffffff; /* 파란색 배경색 */
    }
`;

const TableCell = styled.td`
    padding: 10px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const ContentContainer = styled.div`
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const Button = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;