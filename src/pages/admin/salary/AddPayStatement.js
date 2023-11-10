import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from "@/api/apiPath";

const PayStatement = () => {
    const router = useRouter();
    const { id, s_id, name, rank } = router.query; // ID를 추출

    const [PayStatementData, setPayStatementData] = useState({
        income_tax: 0,
        local_tax: 0,
        national_pension: 0,
        health_insurance: 0,
        c_health_insurance: 0,
        employment_insurance: 0,
    });

    // 입력 항목의 상태를 관리
    const [basicSalary, setBasicSalary] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [overtimePay, setOvertimePay] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [foodPay, setFoodPay] = useState(0);
    const [transportationPay, setTransportationPay] = useState(0);
    
    // 입력 항목의 합계 계산
    const totalEarnings = basicSalary + bonus + overtimePay + allowance + foodPay + transportationPay;
    
    // 각 항목의 공제 합계 계산
    const totalDeductions = PayStatementData.income_tax + PayStatementData.local_tax + PayStatementData.national_pension + PayStatementData.health_insurance + PayStatementData.c_health_insurance + PayStatementData.employment_insurance;
    
    // 합계
    const totalMathPayment = totalEarnings - totalDeductions;
    
    // 지급 총액 1000단위 올림
    const totalPayment = Math.ceil(totalMathPayment / 10000) * 10000

    const handleCalculate = () => {
        const token = localStorage.getItem('token')
        // 계산에 필요한 데이터를 담은 객체를 생성합니다
        const calculationData = {
            s_id: s_id,
            id: id,
            salary: basicSalary,
            bonus: bonus,
            overtime_pay: overtimePay,
            allowance: allowance,
            food_pay: foodPay,
            t_pay: transportationPay,
        };
    
        axios.put(`${BASE_URL}/admin/salary/calculateTaxes`, calculationData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                // 서버에서의 응답을 처리하고 필요하면 업데이트합니다
                console.log('계산이 성공했습니다', response.data);
                // 서버가 데이터를 반환한다면 로컬 상태를 업데이트할 수도 있습니다
                setPayStatementData(response.data);
                alert('계산이 완료되었습니다.');
            })
            .catch((error) => {
                console.error('세금 계산 중 오류 발생', error);
            });
    };


    return (
        <MainContainer>
            <Title>급여관리 - 명세서</Title>
            <SubTitle>직책</SubTitle>
            <SubTitle>이름</SubTitle>

            <SubTitle>2023년 11월 명세서</SubTitle>
            <HeaderRow>
                <div>{name ? name : ''}</div>
                <div>{rank ? rank : ''}</div>
            </HeaderRow>
            <Table>
                <TableHeader>
                <TableCell colSpan={4}>지급내역(과세)</TableCell>
                <TableCell colSpan={2}>지급내역(비과세)</TableCell>
                <TableCell rowSpan={2}>지급액</TableCell>
                <TableCell rowSpan={6}>지급총액</TableCell>
                </TableHeader>
                <tr>
                    <TableCell>기본금</TableCell>
                    <TableCell>상여금</TableCell>
                    <TableCell>야근수당</TableCell>
                    <TableCell>연차수당</TableCell>
                    <TableCell>식비</TableCell>
                    <TableCell>교통비</TableCell>
                </tr>
                <tr>
                    <TableCell>
                        <input
                        type="number"
                        //value={basicSalary}
                        onChange={(e) => setBasicSalary(Number(e.target.value))}
                        placeholder="기본급을 입력하세요"
                        />
                        {basicSalary !== 0 && (
                            <div>{basicSalary.toLocaleString()}</div>
                        )}
                    </TableCell>
                    <TableCell>
                        <input
                            type="number"
                            //value={bonus}
                            onChange={(e) => setBonus(Number(e.target.value))}
                            placeholder="상여금을 입력하세요"
                        /> 
                        {bonus !== 0 && (
                        <div>{bonus.toLocaleString()}</div>
                        )}
                    </TableCell>
                    <TableCell>
                        <input
                            type="number"
                            //value={overtimePay}
                            onChange={(e) => setOvertimePay(Number(e.target.value))}
                            placeholder="야근수당을 입력하세요"
                        />
                        {overtimePay !== 0 && (
                        <div>{overtimePay.toLocaleString()}</div>
                        )}
                    </TableCell>
                    <TableCell>
                        <input
                            type="number"
                            //value={allowance}
                            onChange={(e) => setAllowance(Number(e.target.value))}
                            placeholder="연차수당을 입력하세요"
                        />
                        {allowance !== 0 && (
                        <div>{allowance.toLocaleString()}</div>
                        )}
                    </TableCell>
                    <TableCell>
                        <input
                            type="number"
                            //value={foodPay}
                            onChange={(e) => setFoodPay(Number(e.target.value))}
                            placeholder="식비를 입력하세요"
                        />
                        {foodPay !== 0 && (
                        <div>{foodPay.toLocaleString()}</div>
                        )}
                    </TableCell>
                    <TableCell>
                        <input
                            type="number"
                            //value={transportationPay}
                            onChange={(e) => setTransportationPay(Number(e.target.value))}
                            placeholder="교통비를 입력하세요"
                        />
                        {transportationPay !== 0 && (
                        <div>{transportationPay.toLocaleString()}</div>
                        )}
                    </TableCell>
                    <TableCell>{totalEarnings.toLocaleString()}</TableCell>
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
                    <TableCell>{PayStatementData.income_tax ? PayStatementData.income_tax.toLocaleString() : ''}</TableCell>
                    <TableCell>{PayStatementData.local_tax ? PayStatementData.local_tax.toLocaleString() : ''}</TableCell>
                    <TableCell>{PayStatementData.national_pension ? PayStatementData.national_pension.toLocaleString() : ''}</TableCell>
                    <TableCell>{PayStatementData.health_insurance ? PayStatementData.health_insurance.toLocaleString() : ''}</TableCell>
                    <TableCell>{PayStatementData.c_health_insurance ? PayStatementData.c_health_insurance.toLocaleString() : ''}</TableCell>
                    <TableCell>{PayStatementData.employment_insurance ? PayStatementData.employment_insurance.toLocaleString() : ''}</TableCell>
                    <TableCell>{totalDeductions.toLocaleString()}</TableCell>
                </tr>
                <tr>
                    <TableCell colSpan={6}>합 계</TableCell>
                    <TableCell>{totalMathPayment.toLocaleString()}</TableCell>
                    <TableCell>{totalPayment.toLocaleString()}</TableCell>
                </tr>
            </Table>
            <ButtonContainer>
                <Button onClick={handleCalculate}>계산</Button>
                <Button onClick={() => router.back()}>이전</Button>
            </ButtonContainer>
        </MainContainer>
    );
}

export default PayStatement;

PayStatement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainContainer = styled.div`
    width: 100%;
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