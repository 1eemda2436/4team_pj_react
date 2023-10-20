import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";

const Salary = () => {
    return(
        <Container>
            <Title>급여관리 - 명세서</Title>
            <SubTitle>직책</SubTitle>
            <SubTitle>이름</SubTitle>

            <SubTitle>2023년 10월 명세서</SubTitle>
            <HeaderRow>
                <div>지급일자</div>
                <div>이메일</div>
                <div>직책/이름</div>
            </HeaderRow>
            <Table>
                <TableHeader>
                    <TableCell colSpan={4}>지급내역(과세)</TableCell>
                    <TableCell colSpan={2}>지급내역(비과세)</TableCell>
                    <TableCell rowSpan={2}>지급액</TableCell>
                    <TableCell rowSpan={7}>지급총액</TableCell>
                </TableHeader>
                <tr>
                    <TableCell>기본금</TableCell>
                    <TableCell>상여금</TableCell>
                    <TableCell>야근수당</TableCell>
                    <TableCell>연차수당</TableCell>
                    <TableCell>식비</TableCell>
                    <TableCell>교통비</TableCell>
                </tr>
                {/* 나머지 테이블 로우들 */}
                <tr>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </tr>
                <tr>
                    <TableCell colSpan={6}>공제내역</TableCell>
                    <TableCell rowSpan={2}>공제계</TableCell>
                </tr>
                <tr>
                    <TableCell>소득세</TableCell>
                    <TableCell>지방 소득세</TableCell>
                    <TableCell>국민연금</TableCell>
                    <TableCell>건강보험</TableCell>
                    <TableCell>장기 요양보험</TableCell>
                    <TableCell>고용보험</TableCell>
                </tr>
                <tr>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </tr>
                <tr>
                    <TableCell colSpan={7}>합 계</TableCell>
                </tr>
            </Table>
        </Container>
    );
}

export default Salary;

Salary.getLayout = function getLayout(page) {
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

const Title = styled.h2`
    font-size: 24px;
    margin: 0;
    padding: 10px 0;
    text-align: center;
`;

const SubTitle = styled.div`
    font-size: 18px;
    margin: 10px 0;
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
`;

const TableHeader = styled.tr`
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
    text-align: center;
`;

const TableCell = styled.td`
    padding: 8px;
    border: 1px solid #ccc;
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