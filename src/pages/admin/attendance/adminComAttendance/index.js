import CompanyStickChart from "@/components/chart/CompanyStickChart";
import DepartRadarChart from "@/components/chart/DepartRadarChart";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminAttendanceCom = () => {
    const router = useRouter();

    const [selectedCompany, setSelectedCompany] = useState(''); // 선택한 전사 상태
    const [selectedDepartment, setSelectedDepartment] = useState(''); // 선택한 부서 상태

    const handleSelectCompn = (e) => {
        const selectedCom = e.target.value;
        console.log("전사!", selectedCom);
        setSelectedCompany(selectedCom);
    };

    const handleSelectDepart = (e) => {
        const selectedDepart = e.target.value;
        console.log("부서!", selectedDepart);
        setSelectedDepartment(selectedDepart);
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
                    <CompanyStickChart selectedCompany={selectedCompany} />
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
                        <select
                            onChange={handleSelectCompn} // 선택 변경 핸들러 추가
                            value={selectedCompany}
                        >
                            <option value="">전사 선택</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    
                    <div>
                        <select
                            onChange={handleSelectDepart} // 선택 변경 핸들러 추가
                            value={selectedDepartment}
                        >
                            <option value="">부서 선택</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
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
                <DepartRadarChart selectedDepartment={selectedDepartment} />
            </div>

        </div>
    );
}

export default AdminAttendanceCom;

AdminAttendanceCom.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
