import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeModification = () => {
    const router = useRouter();
    const { id } = router.query; // 이 페이지에 전달된 id 값을 가져옵니다.

    const [departments, setDepartments] = useState([]);
    const [teams, setTeams] = useState([]);

    const [employeeData, setEmployeeData] = useState({
        depart_id: '',
        team_id: '',
        id: '',
        name: '',
        tel: '',
    });

    const handleDepartmentChange = (e) => {
        const selectedDepartmentId = e.target.value;
        // 선택한 부서에 대한 팀 정보 가져오기
        axios.get(`http://localhost:8081/admin/department/teamsFind/${selectedDepartmentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTeams(response.data);
        })
        .catch(error => {
            console.error('팀 정보 가져오기 오류', error);
        });
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        const company_id = localStorage.getItem('company_id')
        axios.get(`http://localhost:8081/admin/department/find/${company_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setDepartments(response.data);
        })
        .catch(error => {
            console.error('부서 정보 가져오기 오류', error);
        });
        
        // 페이지가 처음 로드될 때 팀 정보를 초기화
        setTeams([]);

        if (id) {
            // id를 사용하여 해당 id에 해당하는 사원 데이터를 서버에서 가져옵니다.
            axios.get(`http://localhost:8081/admin/personnel/EmployeeModification/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // 서버에서 가져온 데이터를 employeeData 상태로 설정합니다.
                    setEmployeeData(response.data);
                })
                .catch(error => {
                    console.error('사원 정보 가져오기 오류', error);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token')
      // 사용자 입력을 가지고 서버로 PUT 또는 POST 요청을 보낼 수 있습니다.
        const updatedData = {
            depart_id: employeeData.depart_id,
            team_id: employeeData.team_id,
            id: employeeData.id,
            name: employeeData.name,
            tel: employeeData.tel,
        };

        axios.put(`http://localhost:8081/admin/personnel/EmployeeUpdate/${id}`, updatedData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('사원 정보가 업데이트되었습니다.');
            // 사원 목록 페이지로 돌아갈 수 있습니다.
            router.push('/admin/personnel');
        })
        .catch(error => {
            console.error('사원 수정 오류', error);
        });
    };

    return (
        <Container>
            <Title>인사 관리 - 사원 수정</Title>
            <Table>
                <TableHeader>
                    <TableCell>사번</TableCell>
                    <TableCell>부서</TableCell>
                    <TableCell>팀</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>전화번호</TableCell>
                </TableHeader>
                <TableRow>
                    <TableCell>
                        <input
                            type="text"
                            name="id"
                            readOnly
                            value={employeeData.id}
                            onChange={handleInputChange}
                        />
                    </TableCell>
                    <TableCell>
                        {/* <input
                            type="text"
                            name="depart_id"
                            value={employeeData.depart_id}
                            onChange={handleInputChange}
                        /> */}
                        <select
                            name="depart_id"
                            value={employeeData.depart_id}
                            onChange={(e) => {
                                handleInputChange(e);
                                handleDepartmentChange(e);
                            }}
                        >
                            <option value="">부서를 선택하세요</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>
                                {department.name}
                                </option>
                            ))}
                        </select>
                    </TableCell>
                    <TableCell>
                        {/* <input
                            type="text"
                            name="team_id"
                            value={employeeData.team_id}
                            onChange={handleInputChange}
                        /> */}
                        <select
                            name="team_id"
                            value={employeeData.team_id}
                            onChange={handleInputChange}
                        >
                            <option value="">팀을 선택하세요</option>
                            {teams.map(team => (
                                <option key={team.id} value={team.id}>
                                {team.name}
                                </option>
                            ))}
                        </select>
                    </TableCell>
                    <TableCell>
                        <input
                            type="text"
                            name="name"
                            value={employeeData.name}
                            onChange={handleInputChange}
                        />
                    </TableCell>
                    <TableCell>
                        <input
                            type="text"
                            name="tel"
                            value={employeeData.tel}
                            onChange={handleInputChange}
                        />
                    </TableCell>
                </TableRow>
            </Table>
            <Button onClick={handleUpdate}>수정</Button>
            <Button onClick={() => router.push('/admin/personnel')}>이전</Button>
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