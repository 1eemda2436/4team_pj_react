import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from 'next/router';
import { RouterTwoTone } from '@mui/icons-material';
import moment from 'moment';
import Header from '@/components/common/header';
import { BASE_URL } from '@/api/apiPath';

const BoardDetails = () => {
    const [comments, setComments] = useState([]);
    // const [categoryname, setCategoryname] = useState([]);
    const [boardData, setBoardData] = useState({});
    const [authority, setAuthority] = useState('');
    const router = useRouter();
    const { board_id } = router.query;
    const [categories, setCategories] = useState([]); // 카테고리 목록을 저장할 상태
    
    const [formData, setFormData] = useState({});
    
    const user_name = localStorage.getItem('user_name');
    console.log('user_name', user_name);

    useEffect(() => {
        const token = localStorage.getItem('token')
        // 서버에서 카테고리 목록을 가져오는 요청
        axios.get(`${BASE_URL}/guest/community/categories`, {
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
        const currentDate = moment().format('YYYY-MM-DD'); // 현재 날짜 가져오기
        if (board_id) {
            axios.get(`${BASE_URL}/guest/community/boardFind/${board_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setBoardData(response.data[0]); // 첫 번째 게시글을 가져오도록 수정
                console.log(response.data);
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 오류 발생:', error);
            });
            
            //댓글 불러오기
            axios.get(`${BASE_URL}/guest/comment/commentFind/${board_id}`, {
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
        axios.post(`${BASE_URL}/guest/comment/addComment`, {
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
            axios.get(`${BASE_URL}/guest/comment/commentFind/${board_id}`, {
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
        axios.delete(`${BASE_URL}/guest/community/boardDelete/${board_id}`, {
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
        axios.delete(`${BASE_URL}/guest/comment/deleteComment/${comment_id}`, {
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
        <Title>자유게시판 상세</Title>
        <Container>            
            <Table>
                <tbody>
                    <TableRow>
                        <TableCell1>카테고리</TableCell1>
                        <TableCell>{boardData.category_id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell1>작성자</TableCell1>
                        <TableCell>{boardData.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell1>제목</TableCell1>
                        <TableCell>{boardData.title}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell1>작성일</TableCell1>
                        <TableCell>{moment(boardData.reg_date).format('YYYY-MM-DD')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell1>글내용</TableCell1>
                        <TableCell>{boardData.content}</TableCell>
                    </TableRow>
                </tbody>
            </Table>
            <br/>

            <div>
            <Button onClick={() => router.push('/guest/community')}>목록</Button>
            <Button onClick={() => router.push(`/guest/community/boardUpdate/${board_id}`)}>수정</Button>
            {(authority == "ROLE_MANAGER" || authority == "ROLE_ADMIN" || authority == "ROLE_USER") && (
            <Button onClick={handleDelete}>삭제</Button>
            )}
            </div>
            </Container>
            <br/>
            <br/>
            <br/>

            <Container>
            <Title>댓글</Title>
            <Input
            type="text"
            name="content"
            placeholder="댓글 입력란"
            onChange={handleInputChange}
            value={formData.content}
            />
            <br/>
            <br/>
            <Button onClick={handleCommentSubmit}>댓글 등록</Button>
            <Table>
                <thead>
                    <TableRow>
                        <TableCell1>작성자</TableCell1>
                        <TableCell1>글내용</TableCell1>
                        <TableCell1>작성일</TableCell1>
                        <TableCell1>삭제</TableCell1> 
                    </TableRow>
                </thead>
                <tbody>
                    {comments.map(item => (
                        <TableRow key={item.comment_id}>
                            <TableCell>{user_name}</TableCell>
                            <TableCell>{item.content}</TableCell>
                            <TableCell>{moment(item.reg_date).format('YYYY-MM-DD')}</TableCell>
                            <TableCell>
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

const TableCell1 = styled.td`
    padding: 8px;
    font-weight: bold;
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
    color: #000000;
    margin: 20px 20px;
`;

const Input = styled.input`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
`;


const Button = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    margin-right: 20px;
    text-align: center;
`;
