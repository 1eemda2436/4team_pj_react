import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const BoardWrite = () => {
    const router = useRouter();
    return(
        <Container>
        <Title>자유게시판 등록</Title>
        <Content>
            <Row>
                <div>
                <div>제목</div>
                <Input type="text" />
                </div>
                <div>
                <div>작성일</div>
                <Input type="date" />
                </div>
            </Row>
            <Row>
                <div>
                <div>글내용</div>
                <TextArea rows="6" />
                </div>
            </Row>
            </Content>
            <ButtonContainer>
            <Button onClick={() => router.push('/guest/community')}>등록</Button>
            <Button onClick={() => router.back()}>이전</Button>
            </ButtonContainer>
        </Container>
    )
}

export default BoardWrite;

BoardWrite.getLayout = function getLayout(page) {
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