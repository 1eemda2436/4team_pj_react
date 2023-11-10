import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from "@/api/apiPath";

const AdminPayManagement = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0); 
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    // Axios를 사용하여 Spring Boot 백엔드에서 데이터 가져오기
    axios.get(`${BASE_URL}/admin/salary/salaryMain`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setData(response.data); // 응답 데이터를 상태에 저장
        const total = response.data.reduce((acc, item) => acc + item.salary, 0);
        setTotalSalary(total);
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

  const onInsertHandle = (item) => {
    console.log(item)
    router.push({
      pathname: `/admin/salary/AddPayStatement`,
      query: { 
        id: item.id, 
        s_id: item.s_id,
        name: item.name,
        rank: item.rank,
      }
    });
  };

  const router = useRouter();
  return (
    <MainComponent>
        <Title>급여관리</Title>

        <TblComponent>
          <TblHeader>
            <PayTableTop>
              <thead>
                <tr>
                  {/* <th>+</th> */}
                  <th>사번</th>
                  <th>이름</th>
                  <th>주민번호</th>
                  <th>근무유형</th>
                  <th>소속</th>
                  <th>직원</th>
                  <th>직무</th>
                  <th>재직여부</th>
                  <th>기본급</th>
                  <th>수정</th>
                  <th>명세서</th>
                </tr>
              </thead>
            </PayTableTop>
          </TblHeader>

          <TblContent>
            <PayTableBottom>
              <tbody>
                {data.map(item => (
                  <tr key={item.s_id}>
                    {/* <td>{item.s_id}</td> */}
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.resident}</td>
                    <td>{item.contract}</td>
                    <td>{item.depart_id}</td>
                    <td>{item.rank}</td>
                    <td>{item.state}</td>
                    <td>{item.estate}</td>
                    <td>{item.salary.toLocaleString()}</td>
                    <td onClick={() => onInsertHandle(item)}>수정</td>
                    <td onClick={() => router.push(`/admin/salary/PayStatement?id=${item.id}`)}>상세</td>
                  </tr>
                ))}
              </tbody>
            </PayTableBottom>
          </TblContent>

          <TotalBox>
            <TotalTitle>합계</TotalTitle>
            <TotalResult>{totalSalary.toLocaleString()}</TotalResult>
          </TotalBox>
        </TblComponent>
    </MainComponent>
  );
}

export default AdminPayManagement;

AdminPayManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainComponent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const TblComponent = styled.div`
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,.10);
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
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  }
  
  &::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  }
`;

const Table = styled.table`
  width:100%;
  table-layout: fixed;
  font-size: .9em;
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

