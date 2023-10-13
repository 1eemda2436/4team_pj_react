import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';

const DepartmentManagement = () => {
  const router = useRouter();
  return (
    <CenteredContainer>
      <ContentContainer>
        <Title>인사 관리 - 부서 관리</Title>

        <FormSection>
          <Label>부서코드</Label>
          <div>1</div>
          <Label>부서명</Label>
          <div>FORBIDDEN</div>
          <Label>팀 코드</Label>
          <div>1</div>
          <Label>팀명</Label>
          <div>FORBIDDEN TEAM</div>
        </FormSection>

        <ButtonContainer>
          <Button>수정</Button>
          <Button>등록</Button>
          <Button onClick={() => router.back()}>이전</Button>
        </ButtonContainer>
      </ContentContainer>
    </CenteredContainer>
  );
} 


export default DepartmentManagement;

DepartmentManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  padding: 10px 0;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Label = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
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