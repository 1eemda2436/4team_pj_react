import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';


const BoardDetails = () => {
    const router = useRouter();
    const { board_id } = router.query.board_id;
    console.log(board_id)
    
    return(
        <Container>
            <Title>자유게시판 상세</Title>
            <BackButton onClick={() => router.back()}>이전 아이콘</BackButton>
            <Content>
                <Row>
                <div>
                    <div>제목</div>
                    <div>글내용</div>
                </div>
                <div>
                    <div>프로필</div>
                    <div>작성자</div>
                    <Button onClick={() => router.push('/guest/community/BoardUpdate')}>수정</Button>
                    <Button onClick={() => router.push('/guest/community')}>삭제</Button>
                </div>
                </Row>
                <Row>
                <Input type="text" placeholder="댓글 입력란" />
                <Button>입력</Button>
                </Row>
            </Content>
            <Table>
                <TableRow>
                <TableCell>작성자</TableCell>
                <TableCell>글내용</TableCell>
                <TableCell>일자</TableCell>
                <TableCell>좋아요</TableCell>
                </TableRow>
                <TableCell></TableCell>
            </Table>
        </Container>
    )
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