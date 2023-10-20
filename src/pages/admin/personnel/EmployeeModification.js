import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeModification = () => {
    const router = useRouter();
    const { id } = router.query; // 이 페이지에 전달된 id 값을 가져옵니다.

    const [employeeData, setEmployeeData] = useState({
        depart_id: '',
        team_id: '',
        id: '',
        name: '',
        tel: '',
    });

    useEffect(() => {
        if (id) {
            // id를 사용하여 해당 id에 해당하는 사원 데이터를 서버에서 가져옵니다.
            axios.get(`http://localhost:8081/admin/personnel/EmployeeModification/${id}`)
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
      // 사용자 입력을 가지고 서버로 PUT 또는 POST 요청을 보낼 수 있습니다.
        const updatedData = {
            depart_id: employeeData.depart_id,
            team_id: employeeData.team_id,
            id: employeeData.id,
            name: employeeData.name,
            tel: employeeData.tel,
        };

        axios.put(`http://localhost:8081/admin/personnel/EmployeeUpdate/${id}`, updatedData)
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
                    <TableCell></TableCell>
                    <TableCell>사번</TableCell>
                    <TableCell>부서</TableCell>
                    <TableCell>팀</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell>전화번호</TableCell>
                </TableHeader>
                <TableRow>
                    <TableCell></TableCell>
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
                        <input
                            type="text"
                            name="depart_id"
                            value={employeeData.depart_id}
                            onChange={handleInputChange}
                        />
                    </TableCell>
                    <TableCell>
                        <input
                            type="text"
                            name="team_id"
                            value={employeeData.team_id}
                            onChange={handleInputChange}
                        />
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