import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DepartmentRegistrationModal from './DepartmentRegistrationModal'; // 모달 컴포넌트 임포트
import EditDepartmentModal from './EditDepartmentModal';
import TeamManagement from './TeamManagement'; 


const DepartmentManagement = () => {
  const router = useRouter();

  const [department, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedDepartInfo, setSelectedDepartInfo] = useState({
    depart_id: '',
    depart_name: ''
  });
  
  //페이지 로드 → list
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Axios를 사용하여 Spring Boot 백엔드에서 데이터 가져오기
    axios.get('http://localhost:8081/admin/department/DepartmentManagement', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setData(response.data); // 응답 데이터를 상태에 저장
        console.log(response.data)
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          // AxiosError 처리
          //setError(err.message);
          //console.log(err.message)
        } else {
          // 일반 오류 처리
          setError('데이터를 가져오는 중 오류 발생');
        }
      });
  }, []);

  //부서 등록 모달
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSave = () => {
    // 모달에서 저장 버튼을 눌렀을 때의 로직 추가
    setModalOpen(false); // 모달을 닫을 수도 있음
    router.push('/admin/department-team/'); // 부서 현황 화면으로 리디렉션
  };

  //부서 수정 모달
  const handleEditModalOpen = (depart_id, depart_name) => {
    console.log(depart_id, depart_name)
    setSelectedDepartInfo({
      depart_id,
      depart_name
    });
    console.log(selectedDepartInfo)
    setEditModalOpen(true);
  };

const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

const handleEditModalSave = () => {
    // Handle actions after editing and saving
    setEditModalOpen(false);
    // Perform any other necessary actions
};

  //부서 삭제
  const handleDelete = async (depart_id) => {
    const token = localStorage.getItem('token');
    const result = confirm('정말로 삭제하시겠습니까? (예/아니오)');
    if(result){
      try {
        await axios.put(`http://localhost:8081/admin/department/DepartmentDelete/${depart_id}`, null, {
          headers: {
            'Authorization': `Bearer ${token}`
        }})
        // 성공 처리
        window.location.reload();
    } catch (error) {
        console.log('!!!')
    }
    }
  }

  //특정부서 안보이게 하기
  const filteredDepartments = department.filter(department => department[1] !== '임시 부서');

  return (
    <MainComponent>
      <Title>인사 관리 - 부서 현황</Title>

      <TblComponent>
          <TblHeader>
            <Table>
              <thead>
                <tr>
                    <th>부서 ID</th>
                    <th>부서 명</th>
                    <th>소속팀</th>
                    <th colSpan={3}>현황</th>
                </tr>
              </thead>
            </Table>
      </TblHeader>

      <TblContent>
            <PersonnelTableTop>
                <tbody>
                  {filteredDepartments.map(department => (
                  <tr key={department[0]}>
                    <td>{department[0]}</td>
                    <td>{department[1]}</td>
                    <td>{department[2]}</td>
                    <td>
                    <Button onClick={() => handleEditModalOpen(department[0], department[1])}>부서 수정</Button>
                    </td>
                    <td>
                    <Button onClick={() => handleDelete(department[0])}>부서 삭제</Button>
                    </td>
                    <td>
                    <Button onClick={() => router.push(`/admin/department-team/TeamManagement?depart_id=${department[0]}`)}>팀 현황</Button>
                    </td>
                  </tr>
                  ))}
                </tbody>
            </PersonnelTableTop>
          </TblContent>
        </TblComponent>

        <Button onClick={handleModalOpen}>부서등록</Button>
        <Button onClick={() => router.back()}>이전</Button>

        {isModalOpen && (
          <DepartmentRegistrationModal
            onClose={handleModalClose}
            onSave={handleModalSave}
          />
        )}

        {isEditModalOpen && (
          <EditDepartmentModal
              onClose={handleEditModalClose}
              onSave={handleEditModalSave}
              depart_id={selectedDepartInfo.depart_id}
              depart_name={selectedDepartInfo.depart_name}
          />
        )}
    </MainComponent>
  );
};

export default DepartmentManagement;

DepartmentManagement.getLayout = function getLayout(page) {
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

const PersonnelTableTop = styled(Table)``;

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