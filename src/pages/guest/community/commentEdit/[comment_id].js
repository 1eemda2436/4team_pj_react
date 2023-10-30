import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CommentEdit = () => {
    const router = useRouter();
    const { comment_id } = router.query; // URL에서 댓글 ID를 가져옴
    const { board_id } = router.query;
    const [editedComment, setEditedComment] = useState("");

    useEffect(() => {
        if (comment_id) {
            // 댓글 ID를 사용하여 해당 댓글 데이터를 불러옴
            axios.get(`http://localhost:8081/guest/comment/commentFind/${board_id}`)
                .then(response => {
                    setEditedComment(response.data.content);
                })
                .catch(error => {
                    console.error('댓글 데이터를 불러오는 중 오류 발생:', error);
                });
        }
    }, [comment_id]);

    const handleCommentUpdate = () => {
        const token = localStorage.getItem('token');
        const updatedComment = {
            content: editedComment,
        };

        // 댓글 ID를 사용하여 댓글 업데이트 요청을 보냄
        axios.put(`http://localhost:8081/guest/comment/editComment/${comment_id}`, updatedComment, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('댓글이 성공적으로 수정되었습니다.');
            router.push('/guest/community');
            // 댓글 수정이 완료되면 이전 페이지로 이동 또는 다른 작업 수행
        })
        .catch(error => {
            console.error('댓글 수정 중 오류 발생:', error);
        });
    };

    return (
        <div>
            <label>댓글 수정</label>
            <input
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
            />
            <button onClick={handleCommentUpdate}>수정 완료</button>
        </div>
    );
};

export default CommentEdit;
