import { BASE_URL } from "@/api/apiPath";
import CompanyStickChart from "@/components/chart/CompanyStickChart";
import DepartRadarChart from "@/components/chart/DepartRadarChart";
import AdminLayout from "@/components/layout/adminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminAttendanceCom = () => {
    const router = useRouter();

    const [departments, setDepartments] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(''); // 선택한 전사 상태
    const [selectedDepartment, setSelectedDepartment] = useState(''); // 선택한 부서 상태

    // 부서 목록 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        const company_id = localStorage.getItem('company_id')
        setSelectedCompany(company_id)
        axios.get(`${BASE_URL}/admin/department/find/${company_id}`, {
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

    }, []);

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
                            name="depart_id"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                        >
                            <option value="">부서를 선택하세요</option>
                            {departments.map(department => (
                                <option key={department.depart_id} value={department.depart_id}>
                                {department.depart_name}
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
                <DepartRadarChart selectedDepartment={selectedDepartment} />
            </div>

        </div>
    );
}

export default AdminAttendanceCom;

AdminAttendanceCom.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
