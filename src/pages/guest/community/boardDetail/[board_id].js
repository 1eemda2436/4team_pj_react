import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';
import { RouterTwoTone } from '@mui/icons-material';
import moment from 'moment';
import Header from '@/components/common/header';

const BoardDetails = () => {
    const [comments, setComments] = useState([]);
    // const [categoryname, setCategoryname] = useState([]);
    const [boardData, setBoardData] = useState({});
    const [authority, setAuthority] = useState('');
    const router = useRouter();
    const { board_id } = router.query;
    const [categories, setCategories] = useState([]); // 카테고리 목록을 저장할 상태
    
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token')
        // 서버에서 카테고리 목록을 가져오는 요청
        axios.get('http://localhost:8081/guest/community/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }) // 서버의 카테고리 목록 API 엔드포인트를 사용
            .then(response => {
                setCategories(response.data); // 가져온 카테고리 목록을 설정
                console.log(response.data);
            })
            .catch(error => {
                console.error('카테고리 가져오기 오류:', error);
            });
    }, []);

    useEffect(() => {
        console.log(localStorage.getItem('auth'))
        setAuthority(localStorage.getItem('auth'))
    })

    //게시글 불러오기
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
            
            //댓글 불러오기
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
        const currentDate = moment().format('YYYY-MM-DD'); // 현재 날짜 가져오기
        axios.post(`http://localhost:8081/guest/comment/addComment`, {
            content: formData.content,
            board_id: board_id,
            reg_date: currentDate,
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

    //게시글 삭제
    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8081/guest/community/boardDelete/${board_id}`, {
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

    const handleCommentEdit = (comment_id) => {
        // 댓글 수정 페이지로 이동하며 댓글 ID를 URL에 전달
        router.push(`/guest/community/commentEdit/${comment_id}`);
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
        <>
        <Header />
        <Container>
            <Title>자유게시판 상세</Title>
            <Content>
                <Row>
                    <div>
                        <div>카테고리</div>
                        <div>{boardData.category_id}</div>
                    </div>
                    <div>
                        <div>작성자</div>
                        <div>{boardData.id}</div>
                    </div>
                    <div>
                        <div>제목</div>
                        <div>{boardData.title}</div>
                    </div>
                    <div>
                        <div>작성일</div>
                        <div>{moment(boardData.reg_date).format('YYYY-MM-DD')}</div>
                    </div>
                </Row>
                <Row>
                    <div>
                        <div>글내용</div>
                        <div>{boardData.content}</div>
                    </div>
                </Row>
            </Content>
            <div>
            <Button onClick={() => router.push('/guest/community')}>목록</Button>
            <Button onClick={() => router.push(`/guest/community/boardUpdate/${board_id}`)}>수정</Button>
            {(authority == "ROLE_MANAGER" || authority == "ROLE_ADMIN" || authority == "ROLE_USER") && (
            <Button onClick={handleDelete}>삭제</Button>
            )}
            </div>

            <Input
            type="text"
            name="content"
            placeholder="댓글 입력란"
            onChange={handleInputChange}
            value={formData.content}
            />
            <Button onClick={handleCommentSubmit}>댓글 등록</Button>
            <Table>
                <thead>
                    <TableRow>
                        <TableCell>작성자</TableCell>
                        <TableCell>글내용</TableCell>
                        <TableCell>작성일</TableCell>
                        {/* <TableCell>좋아요</TableCell> */}
                        <TableCell>작업</TableCell> {/* 수정 및 삭제 버튼을 표시할 열 추가 */}
                    </TableRow>
                </thead>
                <tbody>
                    {comments.map(item => (
                        <TableRow key={item.comment_id}>
                            <TableCell>{item.writer}</TableCell>
                            <TableCell>{item.content}</TableCell>
                            <TableCell>{moment(item.reg_date).format('YYYY-MM-DD')}</TableCell>
                            {/* <TableCell>{item.likes}</TableCell> */}
                            <TableCell>
                                {/* <Button onClick={() => handleCommentEdit(item.comment_id)}>수정</Button> */}
                                <Button onClick={() => handleCommentDelete(item.comment_id)}>삭제</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
            
        </Container>
        </>
    );
}

export default BoardDetails;

BoardDetails.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};


const BackButton = styled.div`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
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