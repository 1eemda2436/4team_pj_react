import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';



const EmployeeModification = () => {
    const router = useRouter();
    return (
        <Container>
        <Title>인사 관리 - 사원 관리</Title>
        <Table>
            <TableHeader>
                <TableCell>순번</TableCell>
                <TableCell>부서</TableCell>
                <TableCell>팀</TableCell>
                <TableCell>사번</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>전화번호</TableCell>
            </TableHeader>
            <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </Table>
        <Button onClick={() => router.push('/admin/personnel')}>수정</Button>
        </Container>
    );
}

export default EmployeeModification;

EmployeeModification.getLayout = function getLayout(page) {
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.tr`
  background-color: #f0f0f0;
  text-align: center;
`;

const TableCell = styled.th`
  padding: 8px;
  border: 1px solid #ccc;
`;

const TableRow = styled.tr`
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin: 20px auto;
`;