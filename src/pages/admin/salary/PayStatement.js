import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PayStatement = () => {
    const router = useRouter();
    const id = router.query.id; // ID를 추출
    
    const [PayStatementData, setPayStatementData] = useState([]);
    
    useEffect(() => {
      const token = localStorage.getItem('token')
      if (id) { 
        console.log(id)
        axios.get(`http://localhost:8081/admin/salary/PayStatement/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
            setPayStatementData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching data", error);
        });
      }
    }, [id]);

    // 공제계 합계 계산
    const deductionTotal = (
      PayStatementData.income_tax +
      PayStatementData.local_tax +
      PayStatementData.national_pension +
      PayStatementData.health_insurance +
      PayStatementData.c_health_insurance +
      PayStatementData.employment_insurance
    );

  // 지급계 합계 계산
  const paymentTotal = (
      PayStatementData.salary +
      PayStatementData.bonus +
      PayStatementData.overtime_pay +
      PayStatementData.allowance +
      PayStatementData.food_pay +
      PayStatementData.t_pay
    );

    // 합계
    const totalMathPayment = paymentTotal - deductionTotal;
        
    // 지급 총액 1000단위 올림
    const totalPayment = Math.ceil(totalMathPayment / 10000) * 10000

    return (
        <MainContainer>
          <Title>급여관리 - 명세서</Title>

          <PayContainer>
            <SubTitle>2023년 10월 명세서</SubTitle>

            <TitleBox>
              <SubTitleBox>
                <span>직책</span>
                <div>{PayStatementData.rank}</div>
              </SubTitleBox>
              <SubTitleBox>
                <span>이름</span>
                <div>{PayStatementData.name}</div>
              </SubTitleBox>
            </TitleBox>

            <Table>
                <thead>
                  <TableHeader>
                    <TableCell colSpan={4}>지급내역(과세)</TableCell>
                    <TableCell colSpan={2}>지급내역(비과세)</TableCell>
                    <TableCell rowSpan={2}>지급액</TableCell>
                    <TableCell rowSpan={7}>지급총액</TableCell>
                  </TableHeader>
                </thead>
                <tbody>
                  <tr>
                      <TableCell>기본금</TableCell>
                      <TableCell>상여금</TableCell>
                      <TableCell>야근수당</TableCell>
                      <TableCell>연차수당</TableCell>
                      <TableCell>식비</TableCell>
                      <TableCell>교통비</TableCell>
                  </tr>
                  <tr>
                      <TableCell>{PayStatementData.salary}</TableCell>
                      <TableCell>{PayStatementData.bonus}</TableCell>
                      <TableCell>{PayStatementData.overtime_pay}</TableCell>
                      <TableCell>{PayStatementData.allowance}</TableCell>
                      <TableCell>{PayStatementData.food_pay}</TableCell>
                      <TableCell>{PayStatementData.t_pay}</TableCell>
                      <TableCell>{paymentTotal}</TableCell>
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
                      <TableCell>{PayStatementData.income_tax}</TableCell>
                      <TableCell>{PayStatementData.local_tax}</TableCell>
                      <TableCell>{PayStatementData.national_pension}</TableCell>
                      <TableCell>{PayStatementData.health_insurance}</TableCell>
                      <TableCell>{PayStatementData.c_health_insurance}</TableCell>
                      <TableCell>{PayStatementData.employment_insurance}</TableCell>
                      <TableCell>{deductionTotal}</TableCell>
                  </tr>
                  <tr>
                      <TableCell colSpan={6}>합 계</TableCell>
                      <TableCell>{totalMathPayment}</TableCell>
                      <TableCell>{totalPayment}</TableCell>
                  </tr>
                </tbody>
            </Table>
            <ButtonContainer>
                <Button>발송</Button>
                <Button onClick={() => router.back()}>이전</Button>
            </ButtonContainer>
          </PayContainer>
        </MainContainer>
    );
}

export default PayStatement;

PayStatement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const PayContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: -80px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 30%;
`;

const SubTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: default;
`;

const SubTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 100px;
  width: 100%;
  text-align: center;
  cursor: default;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  cursor: default;
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
  font-weight: 600;
`;