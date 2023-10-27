import DepartStickChart from "@/components/chart/DepartStickChart";
import TeamRadarChart from "@/components/chart/TeamRadarChart";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const AdminAttendanceDep = () => {
    const router = useRouter();

    const [selectedDepartment, setSelectedDepartment] = useState(1); // 선택한 부서 상태
    const [selectedTeam, setSelectedTeam] = useState(1); // 선택한 팀 상태

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
                        onChange={handleSelectDepart} // 선택 변경 핸들러 추가
                        value={selectedDepartment}
                    >
                        <option value="1">부서 선택</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <select
                        onChange={handleSelectTeam} // 선택 변경 핸들러 추가
                        value={selectedTeam}
                    >
                        <option value="1">팀 선택</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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
                        onClick={() => router.push('/admin/attendance/adminAnnualList')}
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
                        onClick={() => router.push('/admin/attendance/adminVacationList')}
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