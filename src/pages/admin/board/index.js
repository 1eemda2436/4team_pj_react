import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { CheckBox } from "@mui/icons-material";
import axios from 'axios';


const handleDelete = () => {
  const token = localStorage.getItem('token');

    // id에 해당하는 게시물을 삭제
    axios.delete(`http://localhost:8081/guest/community//boardDelete/${board_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // 성공적으로 삭제되면 상태를 업데이트하거나 필요한 작업 수행
      console.log(`ID가 ${board_id}인 항목이 성공적으로 삭제되었습니다.`);
    })
    .catch(error => {
    // 에러 처리        
    });
}

const Notice = () => {
  const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const BoardItemTitle = styled.div`
  cursor: pointer;
  color: #007bff;
  font-weight: bold;
`;
  
    useEffect(() => {
      axios.get('http://localhost:8081/board', {
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
    }, []);
  
    const router = useRouter();

    return (
        <Container>
          <Section>
            <h2>공지사항</h2>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>NO.</TableHeader>
                  <TableHeader>제목</TableHeader>
                  <TableHeader>등록일</TableHeader>
                  <TableHeader>선택</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>
                    <LinkItem onClick={() => router.push('/guest/notice/NoticeDetails')}>
                      최근 공지사항을 보여줍니다.
                    </LinkItem>
                  </TableCell>
                  <TableCell>2023-10-06</TableCell>
                </TableRow>
                {/* Add more notice items */}
              </tbody>
            </Table>
          </Section>
      
          <Section>
            <h2>자유게시판</h2>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>글번호</TableHeader>
                  <TableHeader>제목</TableHeader>
                  <TableHeader>글내용</TableHeader>
                  <TableHeader>사진</TableHeader>
                  <TableHeader>조회수</TableHeader>    
                  <TableHeader>작성자</TableHeader>    
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

              
            </TableRow>
          ))}
        </tbody>
            </Table>
            <Button onClick={() => handleDelete()}>삭제</Button>
          </Section>
        </Container>
    );
}

export default Notice;

Notice.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

const TableHeader = styled.th`
    padding: 10px;
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
    background-color: #f00; /* Change to your desired background color */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;