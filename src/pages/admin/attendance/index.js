import DepartStickChart from "@/components/chart/DepartStickChart";
import TeamRadarChart from "@/components/chart/TeamRadarChart";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const AdminAttendanceDep = () => {
    const router = useRouter();

    const [selectedDepartment, setSelectedDepartment] = useState(''); // 선택한 부서 상태
    const [selectedTeam, setSelectedTeam] = useState(''); // 선택한 팀 상태

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

                </ChartSelectBox>

                <ChartBox>
                    <DepartChartBox>
                        <DepartStickChart selectedDepartment={selectedDepartment} />
                    </DepartChartBox>
                    <TeamChartBox>
                        <TeamRadarChart selectedTeam={selectedTeam} />
                    </TeamChartBox>
                </ChartBox>
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
`;

const ChartSelectBox = styled.div``;

const ChartBox = styled.div`
    width: 100%;
    display: flex;
`;

const DepartChartBox = styled.div`
    width: 50%;
    height: 200%;
`;

const TeamChartBox = styled.div`
    width: 50%;
    height: 200%;
`;