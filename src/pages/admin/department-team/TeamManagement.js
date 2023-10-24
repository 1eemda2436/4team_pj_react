import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamRegistrationModal from './TeamRegistrationModal';
import TeamUpdateModal from "./TeamUpdateModal";


const TeamManagement = () => {
    const router = useRouter();

    // 상태 변수를 정의
    const { depart_id } = router.query;
    const [teamData, setTeamData] = useState([]);
    //팀 등록 모달 오픈
    const [isModalOpen, setModalOpen] = useState(false);
    //팀 수정 모달
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedDepartInfo, setSelectedTeamInfo] = useState({
        team_id: '',
        team_name: ''
    });

    // 기초 데이터 송신
    useEffect(() => {
        const token = localStorage.getItem('token');
        // depart_id가 존재할 때에만 데이터를 가져오도록 조건문을 사용합니다.
        if (depart_id) {
            // Axios를 사용하여 데이터를 가져오는 요청을 보냅니다.
            axios.get(`http://localhost:8081/admin/team/select/${depart_id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }})
                .then(response => {
                    setTeamData(response.data); // 응답 데이터를 상태에 저장
                })
                .catch(err => {
                    // 오류 처리
                    console.error('데이터를 가져오는 중 오류 발생:', err);
                });
        }
    }, [depart_id]); // depart_id가 변경될 때마다 useEffect가 실행됩니다.

    //팀 등록 모달
    const teamHandleModalOpen = () => {
        setModalOpen(true);
    };

    const teamHandleModalClose = () => {
        setModalOpen(false);
    };

    const teamHandleModalSave = () => {
        // 모달에서 저장 버튼을 눌렀을 때의 로직 추가
        setModalOpen(false); // 모달을 닫을 수도 있음
        router.push('/admin/department-team/TeamManagement/'); // 팀 현황 화면으로 리디렉션
    };

    //팀 수정 모달
    const teamHandleUpdate = (team_id, team_name) => {
        console.log(team_id, team_name)
        setSelectedTeamInfo({
            team_id, 
            team_name
        })
        console.log(selectedDepartInfo)
        setEditModalOpen(true);
    }

    const teamHandleUpdateClose = () => {
        setEditModalOpen(false);
    };
    
    const teamHandleUpdateSave = () => {
        // Handle actions after editing and saving
        setEditModalOpen(false);
        // Perform any other necessary actions
    };

    //팀 삭제
    const teamHandleDelete = async (team_id) => {
        const token = localStorage.getItem('token');
        console.log(token)
        try {
            await axios.put(`http://localhost:8081/admin/team/delete/${team_id}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
            // 성공 처리
            window.location.reload();
        } catch (error) {
            console.log('!!!')
        }
    }

    return (
        <MainComponent>
        <Title>인사 관리 - 팀 현황</Title>

        <TblComponent>
            <TblHeader>
            <Table>
                <thead>
                <tr>
                    <th>팀 ID</th>
                    <th>팀 명</th>
                    <th colSpan={2}>현황</th>
                </tr>
                </thead>
            </Table>
            </TblHeader>

            <TblContent>
            <TeamTableTop>
                <tbody>
                {teamData.map((team) => (
                        <tr key={team.team_id}>
                            <td>{team.team_id}</td>
                            <td>{team.team_name}</td>
                            <td>
                                <Button onClick={() => teamHandleUpdate(team.team_id, team.team_name)}>팀 수정</Button>
                            </td>
                            <td>
                                <Button onClick={() => teamHandleDelete(team.team_id)}>팀 삭제</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </TeamTableTop>
        </TblContent>
        </TblComponent>
        <Button onClick={teamHandleModalOpen}>팀 등록</Button>
        <Button onClick={() => router.back()}>이전</Button>
        
        {isModalOpen && (
            <TeamRegistrationModal
                depart_id={depart_id} // depart_id를 전달
                onClose={teamHandleModalClose}
                onSave={teamHandleModalSave}
            />
        )}
        {isEditModalOpen && (
            <TeamUpdateModal
                depart_id={depart_id}
                onClose={teamHandleUpdateClose}
                onSave={teamHandleUpdateSave}
                team_id={selectedDepartInfo.team_id}
                team_name={selectedDepartInfo.team_name}
            />
        )}
        
        </MainComponent>
    );
    };

    export default TeamManagement;

    TeamManagement.getLayout = function getLayout(page) {
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

const TeamTableTop = styled(Table)``;

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