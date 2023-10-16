import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPersonnel = () => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Axios를 사용하여 Spring Boot 백엔드에서 데이터 가져오기
      axios.get('http://localhost:8081/salary/personnel')
        .then(response => {
          setData(response.data); // 응답 데이터를 상태에 저장
        })
        .catch(err => {
          if (axios.isAxiosError(err)) {
            // AxiosError 처리
            setError(err.response.data.message);
          } else {
            // 일반 오류 처리
            setError('데이터를 가져오는 중 오류 발생');
          }
        });
    }, []);

    return (
        <MainComponent>
        <Title>인사 관리 - 사원 관리</Title>
        <TblComponent>
        <TblHeader>
            <Table>
            <tr>
                <th>부서</th>
                <th>팀</th>
                <th>사번</th>
                <th>이름</th>
                <th>전화번호</th>
                <th colSpan={2}>수정 / 삭제</th>
                <th>급여</th>
            </tr>
            </Table>
        </TblHeader>
        <TblContent>
            <PayTableTop>
            <Table>
            {data.map(item => (
                <tr key={item.id}>
                  <td>{item.depart_id}</td>
                  <td>{item.team_id}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.tel}</td>
                  <td>
                  <Button onClick={() => router.push(`/admin/personnel/EmployeeModification`)}>수정</Button>
                  </td>
                  <td>
                  <Button>삭제</Button>
                  </td>
                  <td>
                  <Button onClick={() => router.push(`/admin/salary/SalaryCalculator?id=${item.id}`)}>상세</Button>
                  </td>
                </tr>
              ))}
            </Table>
            </PayTableTop>
            {/* 다른 데이터 로우들 */}
        </TblContent>
        <TotalBox>
            <TotalTitle>합계</TotalTitle>
            <TotalResult>999999</TotalResult>
        </TotalBox>
        </TblComponent>
        <div>
            <Button onClick={() => router.push('/admin/personnel/EmployeeRegistration')}>사원등록</Button>
        </div>
        <div>
            <Button onClick={() => router.push('/admin/personnel/DepartmentManagement')}>부서등록</Button>
        </div>
    </MainComponent>
    );
}

export default AdminPersonnel;

AdminPersonnel.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainComponent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const TblComponent = styled.div`
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-top: 40px;
`;

const TblHeader = styled.div`
  padding: 0px 15px;
  background: #F6F8FA;
  border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
  height: 550px;
  overflow-x: auto;
  padding: 0px 15px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  font-size: 0.9em;
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;

  th {
    padding: 20px 15px;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 15px;
    vertical-align: middle;
    font-size: 13px;
    border-bottom: solid 1px #E5E5E5;
    text-align: center;
    word-wrap: break-word;
  }
`;

const PayTableTop = styled(Table)``;

const PayTableBottom = styled(Table)`
  margin-top: 20px;
`;

const TotalBox = styled.div`
  display: flex;
  margin: 50px 30px 20px 30px;
  justify-content: flex-end;
  align-items: flex-end;
  box-sizing: border-box;
`;

const TotalTitle = styled.div`
  color: #007bff;
  font-weight: 700;
  font-size: 20px;
`;

const TotalResult = styled.span`
  margin-left: 15px;
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