import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/common/header';
import moment from 'moment';

const notice = () => {
    const [data, setData] = useState([]);
    const [authority, setAuthority] = useState('');
    
    useEffect(() => {
        console.log(localStorage.getItem('auth'))
        setAuthority(localStorage.getItem('auth'))
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8081/guest/notice/noticeList',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
            setData(response.data)
            })
            .catch(err => {
            if (axios.isAxiosError(err)) {
                // setError(err.response.data.message);
            } else {
                setError('데이터를 가져오는 중 오류 발생');
            }
            })
    },[]);

    const router = useRouter();
    return(
        <MainComponent>
            <Header/>
            <Title>공지사항</Title>
            <TblComponent>
                <TblHeader>
                    <Table>
                        <thead>
                            <tr>
                                <th>글번호</th>
                                <th>제목</th>
                                <th>작성일</th>
                            </tr>
                        </thead>
                    </Table>
                </TblHeader>

                <TblContent>
                    <NoticeTableTOP>
                        <tbody>
                            {data.map(item => (
                            <tr key={item.notice_id}>
                                <td>{item.notice_id}</td>
                                <td>
                                    <BoardItemTitle onClick={() => router.push(`notice/noticeDetail/${item.notice_id}`)}>
                                        {item.title}
                                    </BoardItemTitle>
                                </td>
                                <td>{moment(item.reg_date).format('YYYY-MM-DD')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </NoticeTableTOP>
                </TblContent>
            </TblComponent>
            {(authority == "ROLE_ADMIN") && (
            <Button onClick={() => router.push('/admin/board/noticeWrite')}>글쓰기</Button>
                )}
    </MainComponent>
    )
}

export default notice;

notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
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
    color: #000000;
`;
const TblComponent = styled.div`
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin-top: 40px;
`;

const TblHeader = styled.div`
    padding: 0px 15px;
    background: #F6F8FA;
    border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
    height: 600px;
    overflow-x: auto;
    padding: 0px 15px;

    &::-webkit-scrollbar {
    width: 4px;
    }

    &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
`;

const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    font-size: 0.9em;
    width: 100%;
    min-width: 650px;
    border-collapse: collapse;

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

const NoticeTableTOP = styled(Table)``;

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

const BoardItemTitle = styled.div`
    cursor: pointer;
    color: #000000;
`;

