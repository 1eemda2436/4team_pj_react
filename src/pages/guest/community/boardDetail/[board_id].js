import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';

const BoardDetails = () => {
    const [comments, setComments] = useState([]);
    const [boardData, setBoardData] = useState({});
    const router = useRouter();
    const { board_id } = router.query;

    const [formData, setFormData] = useState({
        content: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (board_id) {
            axios.get(`http://localhost:8081/guest/community/boardFind/${board_id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    setBoardData(response.data[0]); // 첫 번째 게시글을 가져오도록 수정
})
.catch(error => {
    console.error('데이터를 불러오는 중 오류 발생:', error);
});

            axios.get(`http://localhost:8081/guest/comment/commentFind/${board_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setComments(response.data);
                })
                .catch(error => {
                    console.error('댓글을 불러오는 중 오류 발생:', error);
                });
        }
    }, [board_id]);

    const handleCommentSubmit = () => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8081/guest/comment/addComment`, {
            content: formData.content,
            board_id: board_id,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // 댓글을 성공적으로 등록한 경우, 댓글 목록을 다시 불러옵니다.
            axios.get(`http://localhost:8081/guest/comment/commentFind/${board_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('댓글을 불러오는 중 오류 발생:', error);
            });
            // 댓글 입력 필드 초기화
            setFormData({ content: "" });
        })
        .catch(error => {
            console.error('댓글 등록 중 오류 발생:', error);
        });
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8081/guest/community/boardDelete`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('게시물이 성공적으로 삭제되었습니다.');
            router.push('/guest/community');
        })
        .catch(error => {
            console.error('게시물 삭제 중 오류 발생:', error);
        });
    };

    const handleCommentDelete = (comment_id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8081/guest/comment/deleteComment/${comment_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('댓글이 성공적으로 삭제되었습니다.');
            setComments(prevComments => prevComments.filter(comment => comment.comment_id !== comment_id));
        })
        .catch(error => {
            console.error('댓글 삭제 중 오류 발생:', error);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <Container>
            <Title>자유게시판 상세</Title>

            <Button onClick={handleDelete}>삭제</Button>

            

            <Table>
                <TableRow>
                    <TableCell>작성자</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>글내용</TableCell>
                    <TableCell>일자</TableCell>
                </TableRow>
                {boardData.content && (
                    <TableRow key={boardData.board_id}>
                        <TableCell>{boardData.id}</TableCell>
                        <TableCell>{boardData.title}</TableCell>
                        <TableCell>
                            <ContentContainer>
                                {boardData.content}
                            </ContentContainer>
                        </TableCell>
                        <TableCell>{boardData.reg_date}</TableCell>
                    </TableRow>
                )}
            </Table>

            <Input type="text" name="content" placeholder="댓글 입력란" onChange={handleInputChange} value={formData.content} />
            <Button onClick={handleCommentSubmit}>댓글 등록</Button>
            <Table>
                <TableRow>          
                    <TableCell>작성자</TableCell>
                    <TableCell>글내용</TableCell>
                    <TableCell>일자</TableCell>
                    <TableCell>좋아요</TableCell>
                </TableRow>
                {comments.map(item => (
                    <TableRow key={item.comment_id}>
                        <TableCell>{item.writer}</TableCell>
                        <TableCell>{item.content}</TableCell>
                        <TableCell>{item.reg_date}</TableCell>
                        <TableCell>{item.likes}</TableCell>
                        <TableCell>
                            <Button onClick={() => handleCommentDelete(item.comment_id)}>삭제</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <BackButton onClick={() => router.back()}>이전</BackButton>
        </Container>
    );
}

export default BoardDetails;

BoardDetails.getLayout = function getLayout(page) {
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

const Title = styled.h1`
    font-size: 24px;
    margin: 0;
    padding: 10px 0;
    text-align: center;
`;

const BackButton = styled.div`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 24px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
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
    
`;
const ContentContainer = styled.div`
    background-color: #fff;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    max-height: 400px; /* 최대 높이 설정 */
    overflow-y: auto; /* 세로 스크롤 표시, 내용이 넘칠 때만 스크롤이 나타납니다 */
    white-space: pre-wrap;
    word-wrap: break-word;
`;