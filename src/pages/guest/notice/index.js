import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const notice = () => {
    const token = localStorage.getItem('token')
    const router = useRouter();
    return(
        <Container>
        <Content>
          <Title>공지사항</Title>
          <div onClick={() => router.push('/admin/board/NoticeWrite')}>글쓰기(관리자 로그인시 관리자만 보이게)</div>
  
          <Item>
            <div>NO.1</div>
            <div onClick={() => router.push('/guest/notice/NoticeDetails')}>
              최근 공지사항을 보여줍니다.
            </div>
            <div>일자 2023-10-06</div>
          </Item>
  
          <Item>
            <div>NO.2</div>
            <div onClick={() => router.push('/guest/notice/NoticeDetails')}>
              최근 공지사항을 보여줍니다.
            </div>
            <div>일자 2023-10-06</div>
          </Item>
  
          <Item>
            <div>NO.3</div>
            <div onClick={() => router.push('/guest/notice/NoticeDetails')}>
              최근 공지사항을 보여줍니다.
            </div>
            <div>일자 2023-10-06</div>
          </Item>
  
          <Item>
            <div>NO.4</div>
            <div onClick={() => router.push('/guest/notice/NoticeDetails')}>
              최근 공지사항을 보여줍니다.
            </div>
            <div>일자 2023-10-06</div>
          </Item>
        </Content>
      </Container>
    )
}

export default notice;

notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  max-width: 800px;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const Button = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  cursor: pointer;
`;