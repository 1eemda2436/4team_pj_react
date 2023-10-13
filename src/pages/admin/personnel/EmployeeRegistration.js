import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';

const EmployeeRegistration = () => {
  const router = useRouter();
  return (
    <Container>
      <Title>인사 관리 - 사원 등록</Title>

      <FormSection>
        <Label>사원코드</Label>
        <div>1</div>
        <Label>사원명</Label>
        <div>FORBIDDEN</div>
        <Label>전화번호</Label>
        <div>010-5159-6523</div>
      </FormSection>

      <ButtonContainer>
        <Button>업로드</Button>
        <Button>등록</Button>
        <Button onClick={() => router.back()}>이전</Button>
      </ButtonContainer>
    </Container>
  );
} 

export default EmployeeRegistration;

EmployeeRegistration.getLayout = function getLayout(page) {
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

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  padding: 10px 0;
  text-align: center;
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