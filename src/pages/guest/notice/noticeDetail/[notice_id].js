import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';
import Header from '@/components/common/header';
import moment from 'moment';

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
        <Header/>
        <Title>공지사항 상세보기</Title>
        <Container>
            <Table>
                <tbody>
                    <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell>{noticeData.title}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell>{noticeData.content}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>작성일</TableCell>
                        <TableCell>{moment(noticeData.reg_date).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                </tbody>
            </Table>
            <BtnContainer>
                <Button onClick={() => router.push('/guest/notice')}>목록</Button>
                {(authority === "ROLE_ADMIN") && (
                    <Button onClick={() => router.push(`/admin/board/noticeEdit/${noticeData.notice_id}`)}>수정</Button>
                )}
                {(authority === "ROLE_ADMIN") && (
                    <Button onClick={deleteNotice}>삭제</Button>
                )}
            </BtnContainer>
            </Container>
        </>
    );
}

export default NoticeDetails;

NoticeDetails.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const TextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
`;

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

const BtnContainer = styled.div`
    display: flex;
    margin-top: 70px;
    align-items: center;

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
    color: #007bff;
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