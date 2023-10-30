import DepartStickChart from "@/components/chart/DepartStickChart";
import TeamRadarChart from "@/components/chart/TeamRadarChart";
import AdminLayout from "@/components/layout/adminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState  } from "react";
import styled from "styled-components";

const AdminAttendanceDep = () => {
    const router = useRouter();

    const [selectedDepartment, setSelectedDepartment] = useState(''); // 선택한 부서 상태
    const [selectedTeam, setSelectedTeam] = useState(''); // 선택한 팀 상태
    const [departments, setDepartments] = useState([]);
    const [teams, setTeams] = useState([]);

    const handleDepartmentChange = (e) => {
        const depart_id = e.target.value;
        // 선택한 부서에 대한 팀 정보 가져오기
        const token = localStorage.getItem('token')
        axios.get(`http://localhost:8081/admin/department/teamsFind/${depart_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTeams(response.data);
            console.log("값보자!!!", response.data);
        })
        .catch(error => {
            console.error('팀 정보 가져오기 오류', error);
        });
    };

    // 부서 목록 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        const company_id = localStorage.getItem('company_id')
        axios.get(`http://localhost:8081/admin/department/find/${company_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setDepartments(response.data);
            console.log("얘도보자!@!@", response.data);
        })
        .catch(error => {
            console.error('부서 정보 가져오기 오류', error);
        });
        
        // 페이지가 처음 로드될 때 팀 정보를 초기화
        setTeams([]);

    }, []);

    const handleSelectDepart = (e) => {
        const selectedDepart = e.target.value;
        console.log("부서!", selectedDepart);
        setSelectedDepartment(selectedDepart);
    };

    const handleSelectTeam = (e) => {
        const selectedTm = e.target.value;
        console.log("팀!", e.target.value);
        setSelectedTeam(e.target.value);
    };
    

    return (
        <MainContainer>
            <Title>근태관리</Title>

            <ChartContainer>
                <ChartSelectBox>
                    <select
                        name="depart_id"
                        value={departments.depart_id}
                        onChange={(e) => {
                            handleSelectDepart(e);
                            handleDepartmentChange(e);
                        }}
                    >
                        <option value="">부서를 선택하세요</option>
                        {departments.map(department => (
                            <option key={department.depart_id} value={department.depart_id}>
                            {department.depart_name}
                            </option>
                        ))}
                    </select>

                    <select
                            name="team_id"
                            value={teams.team_id}
                            onChange={handleSelectTeam}
                        >
                            <option value="">팀을 선택하세요</option>
                            {teams.map(team => (
                                <option key={team.team_id} value={team.team_id}>
                                {team.team_name}
                                </option>
                            ))}
                    </select>
                </ChartSelectBox>

                <ChartBox>
                    <DepartChartBox onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}>
                        <DepartStickChart selectedDepartment={selectedDepartment} />
                    </DepartChartBox>
                    <TeamChartBox>
                        <TeamRadarChart selectedTeam={selectedTeam} />
                    </TeamChartBox>
                </ChartBox>

                <AttenBtnBox>
                    <button
                        type="button"
                        onClick={() => router.push(`/admin/attendance/adminAnnualList/`)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "20px",
                            fontSize: "1rem",
                            margin: "5px",
                        }}
                    >
                        연차 요청 목록
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/admin/attendance/adminVacationList/`)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: "#007BFF",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "20px",
                            fontSize: "1rem",
                            margin: "5px",
                        }}
                    >
                        휴가 요청 목록
                    </button>
                </AttenBtnBox>
            </ChartContainer>
        </MainContainer>
    );
}

export default AdminAttendanceDep;

AdminAttendanceDep.getLayout = function getLayout(page) {
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

const ChartContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ChartSelectBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`;

const ChartBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const DepartChartBox = styled.div`
    width: 50%;
    height: 100%;
    cursor: pointer;
`;

const TeamChartBox = styled.div`
    width: 25%;
    margin-left: 180px;
`;

const AttenBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 120px;
`;