import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';

const BoardDetails = () => {

    const handleCommentSubmit = () => {
        // formData를 이용하여 댓글 데이터를 서버로 전송
        axios.post(`http://localhost:8081/guest/comment/addComment`, {
            content: formData.content,
            board_id: board_id, // 게시물 ID를 전송
        })
        .then(response => {
            console.log('댓글이 성공적으로 등록되었습니다.');
            console.log(board_id);
            // 댓글을 성공적으로 등록한 경우, 댓글 목록을 다시 불러옵니다.
            axios.get(`http://localhost:8081/guest/comment/commentFind/${board_id}`)
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
    const [comments, setComments] = useState([]);
    const [boardData, setBoardData] = useState({});
    const router = useRouter();

    // 동적 경로를 사용해 게시물 ID를 얻음
    const { board_id } = router.query;
    
    const [formData, setFormData] = useState({
        content: ""
    });

    // 삭제 버튼을 클릭했을 때 게시물 삭제 요청을 보내는 핸들러
        const handleDelete = () => {
            // 게시물 ID를 이용해 서버로 삭제 요청을 보냄
            axios.delete(`http://localhost:8081/guest/community/boardDelete/${board_id}`)
                .then(response => {
                    console.log('게시물이 성공적으로 삭제되었습니다.');
                    // 게시물이 삭제되면 게시판 목록 페이지로 이동
                    router.push('/guest/community');
                })
                .catch(error => {
                    console.error('게시물 삭제 중 오류 발생:', error);
                });
    };      

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handleCommentDelete = (comment_id) => {
        // 댓글 ID를 이용하여 서버로 댓글 삭제 요청을 보냄
        axios.delete(`http://localhost:8081/guest/community/boardDelete/${comment_id}`)
            .then(response => {
                console.log('댓글이 성공적으로 삭제되었습니다.');
                // 댓글을 삭제한 후 댓글 목록을 다시 불러옵니다.
                axios.get(`http://localhost:8081/guest/comment/commentFind/${comment_id}`)
                    .then(response => {
                        setComments(response.data);
                    })
                    .catch(error => {
                        console.error('댓글을 가져오는 중 오류 발생:', error);
                    });
            })
            .catch(error => {
                console.error('댓글 삭제 중 오류 발생:', error);
            });
    };

    useEffect(() => {
        if (board_id) { // board_id 값이 존재할 때만 실행
            // 게시물 데이터를 로드합니다
            axios.get(`http://localhost:8081/guest/community/list/${board_id}`)
                .then(response => {
                    setBoardData(response.data);
                })
                .catch(error => {
                    console.error('데이터를 불러오는 중 오류 발생:', error);
                });
    
            // 해당 게시물의 댓글을 로드합니다
            axios.get(`http://localhost:8081/guest/comment/commentFind/${board_id}`)
                .then(response => {
                    setComments(response.data);
                })
                .catch(error => {
                    console.error('댓글을 불러오는 중 오류 발생:', error);
                });
        }
    }, [board_id]);

    return (
        <Container>
            <Title>자유게시판 상세</Title>
            
                        <Button onClick={handleDelete}>삭제</Button>
            <Content>
                <Row>
                    <div>
                        <div>제목</div>
                        <div>{boardData.title}</div>
                    </div>
                    <div>
                        <div>작성자</div>
                        <div>{boardData.id}</div>
                        
                    </div>
                    
                </Row>
                <Row>
                    <Input type="text" name="content" placeholder="댓글 입력란" onChange={handleInputChange} value={formData.content}/>
                    <Button onClick={handleCommentSubmit}>입력</Button>
                </Row>
            </Content>
            
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
<Button onClick={() => router.back()}>이전</Button>
            <Button onClick={() => router.push('/guest/community/BoardUpdate')}>수정</Button>
            </Table>
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
    cursor: pointer;
    font-size: 24px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
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