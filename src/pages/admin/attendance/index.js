import DepartStickChart from "@/components/chart/DepartStickChart";
import TeamRadarChart from "@/components/chart/TeamRadarChart";
import AdminLayout from "@/components/layout/adminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminAttendanceDep = () => {
    const router = useRouter();

    const [selectedDepartment, setSelectedDepartment] = useState(''); // 선택한 부서 상태
    const [selectedTeam, setSelectedTeam] = useState(''); // 선택한 팀 상태
    const [depart, setDepart] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios   // 부서 목록 용
            .get("http://localhost:8081/guest/department",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("값!@!@", response.data);
                setDepart(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios   // 팀 목록용
            .get("http://localhost:8081/guest/team",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("값좀보자!!!", response.data)
                setTeam(response.data);
            })
            .catch(error => {
                console.error("Error fetching teams:", error);
            });
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
        <div>
            <div style={{ display: "flex", cursor: 'pointer' }}>
                <div
                    style={{
                        flex: "1",
                        borderRadius: "20px",
                        border: "3px solid black",
                        height: "50vh",
                        width: "50%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        fontSize: "1.5rem", // 폰트 크기 추가
                    }}
                    // onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}
                >
                    <DepartStickChart selectedDepartment={selectedDepartment} />
                </div>
                <div
                    style={{
                        flex: "0 0 10%",
                        borderRadius: "20px",
                        border: "3px solid black",
                        width: "30%",
                        height: "80px",
                        marginLeft: "10px",
                        cursor: 'pointer',
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.2rem", // 폰트 크기 추가
                    }}
                >
                    <div>
                        <select name="depart_id" value={depart.depart_id} onChange={handleSelectDepart}>
                            <option value="">부서 선택</option>
                            {depart.map(dp => (
                                <option key={dp[0]} value={dp[0]}>
                                    {dp[1]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <select
                            name="team_id"
                            onChange={handleSelectTeam} // 선택 변경 핸들러 추가
                            value={team.team_id}
                        >
                            <option value="">팀 선택</option>
                            {/* {team.map(tm => (
                                <option key={tm[0]} value={tm[0]}>
                                    {tm[1]}
                                </option>
                            ))} */}
                            {team.map(tm => (
                                <option key={tm.team_id} value={tm.team_id}>
                                    {tm.team_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: "50%",
                    height: "calc(450px - 0px - 3px)",
                    borderRadius: "50%",
                    border: "3px solid black",
                    marginTop: "10px",
                    textAlign: "center",
                    cursor: 'pointer',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    fontSize: "1.5rem", // 폰트 크기 추가
                }}
                onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}
            >
                <TeamRadarChart selectedTeam={selectedTeam} />
            </div>
            <div>
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
            </div>
        </div>
    );
}

export default AdminAttendanceDep;

AdminAttendanceDep.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
