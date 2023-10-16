import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import styled from "styled-components";

const Notice = () => {
    const router = useRouter();
    return(
<Container>
    <Section>
        <h2>공지사항</h2>
        <ItemContainer>
        <Item>NO.</Item>
        <LinkItem onClick={() => router.push('/guest/notice/NoticeDetails')}>
            최근 공지사항을 보여줍니다.
        </LinkItem>
        <Item>일자 2023-10-06</Item>
        <Button>체크박스</Button>
        </ItemContainer>
    </Section>
    <Button>삭제</Button>
    <Section>
        <h2>자유게시판</h2>
        <ItemContainer>
        <div>
            <div>작성자</div>
            <div>조회수</div>
        </div>
        <div>사진</div>
        <div>
            <LinkItem onClick={() => router.push('/guest/community/BoardDetails')}>제목</LinkItem>
            <div>글내용</div>
        </div>
        </ItemContainer>
    </Section>
    <Button>삭제</Button>
    </Container>
    )
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

const Title = styled.h2`
    font-size: 24px;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
`;

const Item = styled.div`
    padding: 10px;
    margin-right: 10px;
`;

const LinkItem = styled.div`
    cursor: pointer;
    color: #007bff;
`;

const Button = styled.button`
    padding: 5px 10px;
    background-color: #f00; /* 원하는 배경색으로 변경하세요 */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;